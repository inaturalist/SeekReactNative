// @flow

import React, { useReducer, useEffect, useCallback } from "react";
import { Platform } from "react-native";
import inatjs from "inaturalistjs";
import { useNavigation, useRoute } from "@react-navigation/native";

import { addToCollection } from "../../utility/observationHelpers";
import FullPhotoLoading from "./FullPhotoLoading";
import { fetchTruncatedUserLocation } from "../../utility/locationHelpers";
import createUserAgent from "../../utility/userAgent";
import { fetchSpeciesSeenDate } from "../../utility/dateHelpers";
import { useLocationPermission } from "../../utility/customHooks";
import {
  setAncestorIdsiOS,
  createSpecies,
  createAncestor,
  checkForSpecies,
  checkForAncestor,
  createObservationForRealm,
  navToMatch,
  setImageCoords
} from "../../utility/resultsHelpers";

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
          taxon: action.newTaxon,
          loading: false
        };
      case "SET_ANCESTOR":
        return { ...state, taxon: action.newTaxon, loading: false };
      case "SPECIES_SEEN":
        return { ...state, seenDate: action.date };
      case "NO_MATCH":
        return { ...state, loading: false };
      case "ADD_LOCATION_TO_NEW_OBS":
        return { ...state, image: action.image };
      case "SET_LOCATION_ERROR":
        return { ...state, errorCode: action.code };
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

  const newObs: ?boolean = observation && !seenDate;

  const setSpeciesInfo = ( species, taxa ) => {
    const obs = createObservationForRealm( species, taxa );
    const newTaxon = createSpecies( species, taxa );

    dispatch( { type: "SET_SPECIES", obs, newTaxon } );
  };

  const fetchSpeciesPhoto = useCallback( ( species: {
    taxon_id: number,
    name: string,
    ancestor_ids: Array<number>
  } ) => {
    const options = { user_agent: createUserAgent() };

    inatjs.taxa.fetch( species.taxon_id, options ).then( ( { results } ) => {
      const taxa = results[0];
      setSpeciesInfo( species, taxa );
    } ).catch( () => {
      setSpeciesInfo( species, null );
    } );
  }, [] );

  const setAncestor = ( ancestor, taxa ) => {
    const newTaxon = createAncestor( ancestor, taxa );
    dispatch( { type: "SET_ANCESTOR", newTaxon } );
  };

  const fetchAncestorPhoto = useCallback( ( ancestor: {
    taxon_id: number,
    name: string,
    rank: number
  }  ) => {
    const options = { user_agent: createUserAgent() };

    inatjs.taxa.fetch( ancestor.taxon_id, options ).then( ( { results } ) => {
      const taxa = results[0];
      setAncestor( ancestor, taxa );
    } ).catch( () => {
      // make sure speciesSeenImage is not undefined when no internet
      setAncestor( ancestor, null );
    } );
  }, [] );

  const checkSpeciesSeen = ( taxaId ) => {
    fetchSpeciesSeenDate( taxaId ).then( ( date: ?string ) => {
      if ( date !== null ) {
        dispatch( { type: "SPECIES_SEEN", date } );
      }
    } );
  };

  const checkVisionResults = useCallback( () => {
    const species = checkForSpecies( image.predictions, threshold );

    if ( species ) {
      checkSpeciesSeen( Number( species.taxon_id ) );

      if ( Platform.OS === "ios" ) {
        species.ancestor_ids = setAncestorIdsiOS( image.predictions );
      }

      fetchSpeciesPhoto( species );
    } else {
      const ancestor = checkForAncestor( image.predictions, threshold );

      if ( ancestor ) {
        fetchAncestorPhoto( ancestor );
      } else {
        dispatch( { type: "NO_MATCH" } );
      }
    }
  }, [fetchAncestorPhoto, fetchSpeciesPhoto, image.predictions] );

  const getUserLocation = useCallback( () => {
    // Android photo gallery images should already have lat/lng
    if ( image.latitude ) {
      return;
    }

    if ( Platform.OS === "android" && granted === false ) {
      dispatch( { type: "SET_LOCATION_ERROR", code: 1 } );
    } else {
      fetchTruncatedUserLocation().then( ( coords ) => {
        dispatch( { type: "ADD_LOCATION_TO_NEW_OBS", image: setImageCoords( coords, image ) } );
      } ).catch( ( code ) => {
        dispatch( { type: "SET_LOCATION_ERROR", code } );
      } );
    }
  }, [image, granted] );

  const addObservation = useCallback( async () => {
    await addToCollection( observation, image );
  }, [observation, image] );

  const navToResults = useCallback( () => {
    navToMatch( navigation, taxon, image, seenDate, errorCode );
  }, [navigation, taxon, image, seenDate, errorCode] );

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
    navigation.addListener( "focus", () => {
      getUserLocation(); // need this for Species Nearby This Taxon on Match Screen
      checkVisionResults();
    } );
  }, [navigation, checkVisionResults, getUserLocation] );

  return <FullPhotoLoading uri={params.image.uri} />;
};

export default OfflineARResults;
