// @flow

import React, { useReducer, useEffect, useCallback } from "react";
import { Platform } from "react-native";
import inatjs from "inaturalistjs";
import { useNavigation, useRoute } from "@react-navigation/native";

import { getTaxonCommonName, checkForIconicTaxonId } from "../../utility/helpers";
import { addToCollection } from "../../utility/observationHelpers";
import FullPhotoLoading from "./FullPhotoLoading";
import { fetchTruncatedUserLocation } from "../../utility/locationHelpers";
import createUserAgent from "../../utility/userAgent";
import { fetchSpeciesSeenDate } from "../../utility/dateHelpers";
import { useLocationPermission } from "../../utility/customHooks";

const threshold = 0.7;

const OfflineARResults = () => {
  const granted = useLocationPermission();
  const navigation = useNavigation();
  const { params } = useRoute();

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    switch ( action.type ) {
      case "SET_SPECIES":
        return {
          ...state,
          observation: action.obs,
          taxon: action.newTaxon
        };
      case "SET_ANCESTOR":
        return { ...state, taxon: action.newTaxon, loading: false };
      case "SPECIES_SEEN":
        return { ...state, seenDate: action.date };
      case "FINISHED_LOADING":
        return { ...state, loading: false };
      case "ADD_LOCATION_TO_NEW_OBS":
        return { ...state, image: action.image, loading: false };
      case "SET_LOCATION_ERROR":
        return { ...state, errorCode: action.code, loading: false };
      default:
        throw new Error();
    }
  }, {
    taxon: {},
    image: params.image,
    loading: true,
    errorCode: null,
    seenDate: null,
    observation: null
  } );

  const {
    taxon,
    image,
    loading,
    errorCode,
    seenDate,
    observation
  } = state;

  const newObs = observation && !seenDate;

  const setSpeciesInfo = ( species, taxa ) => {
    const taxaId = Number( species.taxon_id );
    const iconicTaxonId = checkForIconicTaxonId( species.ancestor_ids );

    getTaxonCommonName( species.taxon_id ).then( ( commonName ) => {
      const obs = {
        taxon: {
          default_photo: taxa && taxa.default_photo ? taxa.default_photo : null,
          id: taxaId,
          name: species.name,
          iconic_taxon_id: iconicTaxonId,
          ancestor_ids: species.ancestor_ids
        }
      };

      const newTaxon = {
        taxaId,
        taxaName: commonName || species.name,
        scientificName: species.name,
        speciesSeenImage:
          taxa && taxa.taxon_photos[0]
            ? taxa.taxon_photos[0].photo.medium_url
            : null
      };

      dispatch( { type: "SET_SPECIES", obs, newTaxon } );
    } );
  };

  const fetchSpeciesPhoto = useCallback( ( species ) => {
    const options = { user_agent: createUserAgent() };

    inatjs.taxa.fetch( species.taxon_id, options ).then( ( { results } ) => {
      const taxa = results[0];
      setSpeciesInfo( species, taxa );
    } ).catch( () => {
      setSpeciesInfo( species, null );
    } );
  }, [] );

  const setAncestor = ( ancestor, speciesSeenImage ) => {
    getTaxonCommonName( ancestor.taxon_id ).then( ( commonName ) => {
      const newTaxon = {
        commonAncestor: commonName || ancestor.name,
        taxaId: ancestor.taxon_id,
        speciesSeenImage,
        scientificName: ancestor.name,
        rank: ancestor.rank
      };

      dispatch( { type: "SET_ANCESTOR", newTaxon } );
    } );
  };

  const fetchAncestorPhoto = useCallback( ( ancestor ) => {
    const options = { user_agent: createUserAgent() };

    inatjs.taxa.fetch( ancestor.taxon_id, options ).then( ( { results } ) => {
      const taxa = results[0];
      const speciesSeenImage = taxa.taxon_photos[0] ? taxa.taxon_photos[0].photo.medium_url : null;
      setAncestor( ancestor, speciesSeenImage );
    } ).catch( () => {
      // make sure speciesSeenImage is not undefined when no internet
      setAncestor( ancestor, null );
    } );
  }, [] );

  const checkForAncestor = useCallback( () => {
    const reversePredictions = image.predictions.reverse();
    const ancestor = reversePredictions.find( leaf => leaf.score > threshold );

    if ( ancestor && ancestor.rank !== 100 ) {
      fetchAncestorPhoto( ancestor );
    } else {
      dispatch( { type: "FINISHED_LOADING" } );
    }
  }, [fetchAncestorPhoto, image.predictions] );

  const checkSpeciesSeen = ( taxaId ) => {
    fetchSpeciesSeenDate( taxaId ).then( ( date ) => {
      if ( date !== null ) {
        dispatch( { type: "SPECIES_SEEN", date } );
      }
    } );
  };

  const setAncestorIdsiOS = useCallback( () => {
    // adding ancestor ids to take iOS camera experience offline
    const ancestorIds = image.predictions.map( ( p ) => Number( p.taxon_id ) );
    return ancestorIds.sort();
  }, [image.predictions] );

  const checkVisionResults = useCallback( () => {
    const species = image.predictions.find( leaf => (
      leaf.rank === 10 && leaf.score > threshold
    ) );

    if ( species ) {
      checkSpeciesSeen( Number( species.taxon_id ) );

      if ( Platform.OS === "ios" ) {
        species.ancestor_ids = setAncestorIdsiOS();
      }

      fetchSpeciesPhoto( species );
    } else {
      checkForAncestor();
    }
  }, [checkForAncestor, fetchSpeciesPhoto, image.predictions, setAncestorIdsiOS] );

  const getUserLocation = useCallback( () => {
    // Android photo gallery images should already have lat/lng
    if ( image.latitude ) {
      dispatch( { type: "FINISHED_LOADING" } );
    }

    if ( Platform.OS === "android" && !granted ) {
      dispatch( { type: "SET_LOCATION_ERROR", code: 1 } );
    } else {
      fetchTruncatedUserLocation().then( ( coords ) => {
        if ( coords ) {
          const { latitude, longitude } = coords;

          image.latitude = latitude;
          image.longitude = longitude;

          dispatch( { type: "ADD_LOCATION_TO_NEW_OBS", image } );
        }
      } ).catch( ( code ) => {
        dispatch( { type: "SET_LOCATION_ERROR", code } );
      } );
    }
  }, [image, granted] );

  const addObservation = useCallback( async () => {
    await addToCollection( observation, image );
  }, [observation, image] );

  const navToResults = useCallback( () => {
    navigation.push( "Drawer", {
      screen: "Main",
      params: {
        screen: "Match",
        params: {
          taxon,
          image,
          seenDate,
          errorCode
        }
      }
    } );
  }, [taxon, image, seenDate, errorCode, navigation] );

  const showResults = useCallback( async () => {
    if ( newObs ) {
      await addObservation();
      navToResults();
    } else {
      navToResults();
    }
  }, [navToResults, newObs, addObservation] );

  useEffect( () => {
    if ( !loading ) {
      showResults();
    }
  }, [loading, showResults] );

  useEffect( () => {
    if ( observation ) { // need lat/lng for resighted photo too
      getUserLocation();
    }
  }, [observation, getUserLocation] );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      checkVisionResults();
    } );
  }, [navigation, checkVisionResults] );

  return <FullPhotoLoading uri={params.image.uri} />;
};

export default OfflineARResults;
