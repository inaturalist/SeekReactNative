import React, { useState, useEffect, useCallback } from "react";
import { Platform } from "react-native";
import inatjs from "inaturalistjs";
// import { NavigationEvents } from "@react-navigation/compat";
import { useNavigation, useRoute } from "@react-navigation/native";

import ConfirmScreen from "./ConfirmScreen";
import ErrorScreen from "./Error";
import {
  // capitalizeNames,
  flattenUploadParameters,
  // getTaxonCommonName,
  createJwtToken
} from "../../utility/helpers";
import { addToCollection } from "../../utility/observationHelpers";
import { fetchTruncatedUserLocation } from "../../utility/locationHelpers";
import { checkLocationPermissions } from "../../utility/androidHelpers.android";
import { resizeImage } from "../../utility/photoHelpers";
import createUserAgent from "../../utility/userAgent";
import { fetchSpeciesSeenDate, createTimestamp } from "../../utility/dateHelpers";

const OnlineServerResults = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    uri,
    time,
    latitude,
    longitude
  } = route.params;

  const [latLng, setLatLng] = useState( {
    latitude,
    longitude
  } );
  const [userImage, setUserImage] = useState( null );
  // const [speciesSeenImage, setSpeciesSeenImage] = useState( null );
  const [observation, setObservation] = useState( null );
  // const [taxaId, setTaxaId] = useState( null );
  // const [taxaName, setTaxaName] = useState( null );
  // const [commonAncestor, setCommonAncestor] = useState( null );
  const [seenDate, setSeenDate] = useState( null );
  const [error, setError] = useState( null );
  // const [scientificName, setScientificName] = useState( null );
  const [match, setMatch] = useState( null );
  const [clicked, setClicked] = useState( false );
  const [numberOfHours, setNumberOfHours] = useState( null );
  const [errorCode, setErrorCode] = useState( null );
  // const [rank, setRank] = useState( null );

  const getUserLocation = () => {
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const lat = coords.latitude;
        const long = coords.longitude;

        setLatLng( {
          latitude: lat,
          longitude: long
        } );
      }
    } ).catch( ( code ) => {
      setErrorCode( code );
    } );
  };

  useEffect( () => {
    if ( !latitude || !longitude ) {
      if ( Platform.OS === "android" ) {
        checkLocationPermissions().then( ( granted ) => {
          if ( granted ) {
            getUserLocation();
          }
        } );
      } else {
        getUserLocation();
      }
    }
  }, [latitude, longitude] );

  // const setOnlineVisionSpeciesResults = ( species ) => {
  //   const { taxon } = species;
  //   const photo = taxon.default_photo;

  //   getTaxonCommonName( taxon.id ).then( ( commonName ) => {
  //     setObservation( species );
  //     setTaxaId( taxon.id );
  //     setTaxaName( capitalizeNames( commonName || taxon.name ) );
  //     setScientificName( taxon.name );
  //     setSpeciesSeenImage( photo ? photo.medium_url : null );
  //     setMatch( true );
  //   } );
  // };

  // const setOnlineVisionAncestorResults = ( ancestor ) => {
  //   const { taxon } = ancestor;
  //   const photo = taxon.default_photo;

  //   getTaxonCommonName( taxon.id ).then( ( commonName ) => {
  //     setCommonAncestor( ancestor && capitalizeNames( commonName || taxon.name ) );
  //     setTaxaId( taxon.id );
  //     setScientificName( taxon.name );
  //     setSpeciesSeenImage( photo ? photo.medium_url : null );
  //     setRank( taxon.rank_level );
  //     setMatch( false );
  //   } );
  // };

  const checkSpeciesSeen = ( id ) => {
    fetchSpeciesSeenDate( id ).then( ( date ) => {
      setSeenDate( date );
    } );
  };

  const showMatch = async () => {
    if ( !seenDate ) {
      await addObservation();
      navigateToMatch();
    } else {
      navigateToMatch();
    }
  };

  const resize = () => {
    resizeImage( uri, 299 ).then( ( image ) => {
      if ( image ) {
        setUserImage( image );
      } else {
        setError( "image" );
      }
    } ).catch( () => setError( "image" ) );
  };

  useEffect( () => {
    navigation.addListener( "focus", () => {
      resize();
    } );
  } );

  const fetchScore = useCallback( ( params ) => {
    const token = createJwtToken();
    const options = { api_token: token, user_agent: createUserAgent() };

    inatjs.computervision.score_image( params, options ).then( ( response ) => {
      const species = response.results[0];
      const ancestor = response.common_ancestor;

      if ( species.combined_score > 85 && species.taxon.rank === "species" ) {
        checkSpeciesSeen( species.taxon.id );
        setOnlineVisionSpeciesResults( species );
      } else if ( ancestor ) {
        setOnlineVisionAncestorResults( ancestor );
      } else {
        setMatch( false );
      }
    } ).catch( ( { response } ) => {
      if ( response.status && response.status === 503 ) {
        const gmtTime = response.headers.map["retry-after"];
        const currentTime = createTimestamp();
        const retryAfter = createTimestamp( gmtTime );

        const hours = ( retryAfter - currentTime ) / 60 / 60 / 1000;

        if ( hours ) {
          setNumberOfHours( hours.toFixed( 0 ) );
        }
        setError( "downtime" );
      } else {
        setError( "onlineVision" );
      }
    } );
  }, [setError, ] );

  useEffect( () => {
    if ( userImage ) {
      const params = flattenUploadParameters( userImage, time, latLng.latitude, latLng.longitude );
      fetchScore( params );
    }
  }, [userImage, fetchScore, latLng, time] );

  const addObservation = () => {
    if ( latLng.latitude && latLng.longitude ) {
      addToCollection( observation, latLng.latitude, latLng.longitude, uri, time );
    }
  };

  const navigateToMatch = () => {
    navigation.push( "Match", {
      userImage,
      observation,
      uri,
      taxaName,
      taxaId,
      speciesSeenImage,
      seenDate,
      scientificName,
      latitude: latLng.latitude,
      longitude: latLng.longitude,
      time,
      commonAncestor,
      match,
      errorCode,
      rank
    } );
  };

  useEffect( () => {
    if ( clicked ) {
      if ( match === true ) {
        showMatch();
      } else {
        navigateToMatch();
      }
    }
  }, [clicked, showMatch, navigateToMatch, match] );

  const updateClicked = () => setClicked( true );

  return (
    <>
      {/* <NavigationEvents
        onWillFocus={() => {
          this.getLocation();
          this.resizeImage();
        }}
      /> */}
      {error
        ? (
          <ErrorScreen
            error={error}
            number={numberOfHours}
          />
        ) : (
          <ConfirmScreen
            checkForMatches={updateClicked}
            clicked={clicked}
            image={uri}
            match={match}
          />
        )}
    </>
  );
};

export default OnlineServerResults;
