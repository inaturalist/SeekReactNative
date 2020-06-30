// @flow

import React, { useState, useEffect, useCallback } from "react";
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

  const [taxon, setTaxon] = useState( {} );
  const [image, setImage] = useState( params.image );
  const [observation, setObservation] = useState( null );
  const [seenDate, setSeenDate] = useState( null );
  const [match, setMatch] = useState( null );
  const [errorCode, setLocationErrorCode] = useState( null );

  const setSpeciesInfo = ( species, taxa ) => {
    const taxaId = Number( species.taxon_id );
    const iconicTaxonId = checkForIconicTaxonId( species.ancestor_ids );

    getTaxonCommonName( species.taxon_id ).then( ( commonName ) => {
      setObservation( {
        taxon: {
          default_photo: taxa && taxa.default_photo ? taxa.default_photo : null,
          id: taxaId,
          name: species.name,
          preferred_common_name: commonName,
          iconic_taxon_id: iconicTaxonId,
          ancestor_ids: species.ancestor_ids
        }
      } );

      const newTaxon = {
        taxaId,
        taxaName: commonName || species.name,
        scientificName: species.name,
        speciesSeenImage:
          taxa && taxa.taxon_photos[0]
            ? taxa.taxon_photos[0].photo.medium_url
            : null
      };

      setTaxon( newTaxon );
      setMatch( true );
    } );
  };

  const fetchAdditionalSpeciesInfo = useCallback( ( species ) => {
    const options = { user_agent: createUserAgent() };

    inatjs.taxa.fetch( species.taxon_id, options ).then( ( response ) => {
      const taxa = response.results[0];
      setSpeciesInfo( species, taxa );
    } ).catch( () => {
      setSpeciesInfo( species );
    } );
  }, [] );

  const setCommonAncestor = ( ancestor, speciesSeenImage ) => {
    getTaxonCommonName( ancestor.taxon_id ).then( ( commonName ) => {
      const newTaxon = {
        commonAncestor: commonName || ancestor.name,
        taxaId: ancestor.taxon_id,
        speciesSeenImage,
        scientificName: ancestor.name,
        rank: ancestor.rank
      };

      setTaxon( newTaxon );
      setMatch( false );
    } );
  };

  const fetchAdditionalAncestorInfo = useCallback( ( ancestor ) => {
    const options = { user_agent: createUserAgent() };

    inatjs.taxa.fetch( ancestor.taxon_id, options ).then( ( response ) => {
      const taxa = response.results[0];
      const speciesSeenImage = taxa.taxon_photos[0] ? taxa.taxon_photos[0].photo.medium_url : null;
      setCommonAncestor( ancestor, speciesSeenImage );
    } ).catch( () => {
      setCommonAncestor( ancestor );
    } );
  }, [] );

  const checkForCommonAncestor = useCallback( () => {
    const reversePredictions = image.predictions.reverse();

    const ancestor = reversePredictions.find( leaf => leaf.score > threshold );

    if ( ancestor && ancestor.rank !== 100 ) {
      fetchAdditionalAncestorInfo( ancestor );
    } else {
      setMatch( false );
    }
  }, [fetchAdditionalAncestorInfo, image.predictions] );

  const checkSpeciesSeen = ( taxaId ) => {
    fetchSpeciesSeenDate( taxaId ).then( ( date ) => {
      setSeenDate( date );
    } );
  };

  const setARCameraVisionResults = useCallback( () => {
    const ancestorIds = [];

    if ( Platform.OS === "ios" ) {
      console.log( image.predictions, "image predictions" );
      image.predictions.forEach( ( prediction ) => {
        ancestorIds.push( Number( prediction.taxon_id ) );
      } );
    }
    // adding ancestor ids to take iOS camera experience offline

    const species = image.predictions.find( leaf => ( leaf.rank === 10 && leaf.score > threshold ) );

    if ( species ) {
      if ( Platform.OS === "ios" ) {
        species.ancestor_ids = ancestorIds.sort();
      }
      checkSpeciesSeen( Number( species.taxon_id ) );
      fetchAdditionalSpeciesInfo( species );
    } else {
      checkForCommonAncestor();
    }
  }, [checkForCommonAncestor, fetchAdditionalSpeciesInfo, image.predictions] );

  const getUserLocation = useCallback( () => {
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const { latitude, longitude } = coords;

        image.latitude = latitude;
        image.longitude = longitude;

        setImage( image );
        setARCameraVisionResults();
      } else {
        setARCameraVisionResults();
      }
    } ).catch( ( code ) => {
      setLocationErrorCode( code );
      setARCameraVisionResults();
    } );
  }, [image, setARCameraVisionResults] );

  const requestAndroidPermissions = useCallback( () => {
    if ( !image.latitude ) {
      // Android photo gallery images should already have lat/lng
      if ( Platform.OS === "android" && !granted ) {
        setLocationErrorCode( 1 );
        setARCameraVisionResults();
      } else {
        getUserLocation();
      }
    } else {
      setARCameraVisionResults();
    }
  }, [image.latitude, granted, getUserLocation, setARCameraVisionResults] );

  const addObservation = useCallback( async () => {
    await addToCollection( observation, image );
  }, [observation, image] );

  const navigateToMatch = useCallback( () => {
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

  const showMatch = useCallback( async () => {
    if ( !seenDate && match ) {
      await addObservation();
      navigateToMatch();
    } else {
      navigateToMatch();
    }
  }, [navigateToMatch, seenDate, match, addObservation] );

  useEffect( () => {
    if ( match !== null ) {
      showMatch();
    }
  }, [match, showMatch] );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      requestAndroidPermissions();
    } );
  }, [navigation, requestAndroidPermissions] );

  return <FullPhotoLoading uri={image.uri} />;
};

export default OfflineARResults;
