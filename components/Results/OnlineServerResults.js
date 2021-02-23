// @flow

import React, { useReducer, useEffect, useCallback } from "react";
import inatjs from "inaturalistjs";
import { useNavigation, useRoute } from "@react-navigation/native";

import ConfirmScreen from "./ConfirmScreen";
import ErrorScreen from "./Error";
import { createJwtToken } from "../../utility/helpers";
import { flattenUploadParameters } from "../../utility/photoHelpers";
import { addToCollection } from "../../utility/observationHelpers";
import { fetchTruncatedUserLocation, createLocationAlert } from "../../utility/locationHelpers";
import createUserAgent from "../../utility/userAgent";
import { fetchSpeciesSeenDate, serverBackOnlineTime } from "../../utility/dateHelpers";
import {
  findNearestPrimaryRankTaxon,
  checkCommonAncestorRank,
  createOnlineSpecies,
  createOnlineAncestor,
  navToMatch,
  setImageCoords
} from "../../utility/resultsHelpers";

const OnlineServerResults = () => {
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
      case "ERROR":
        return { ...state, error: action.error, numberOfHours: action.numberOfHours || null };
      case "CLICKED":
        return { ...state, clicked: true };
      default:
        throw new Error();
    }
  }, {
    taxon: {},
    image: params.image,
    loading: true,
    errorCode: null,
    seenDate: null,
    observation: null,
    error: null,
    clicked: false,
    numberOfHours: null
  } );

  const {
    taxon,
    image,
    loading,
    errorCode,
    seenDate,
    observation,
    error,
    clicked,
    numberOfHours
  } = state;

  const newObs = observation && !seenDate;

  const getUserLocation = useCallback( () => {
    // this should only apply to iOS photos with no metadata
    // once metadata is fixed, should be able to remove this check for user location
    if ( image.latitude ) {
      return;
    }

    fetchTruncatedUserLocation().then( ( coords ) => {
      dispatch( { type: "ADD_LOCATION_TO_NEW_OBS", image: setImageCoords( coords, image ) } );
    } ).catch( ( code ) => {
      dispatch( { type: "SET_LOCATION_ERROR", code } );
    } );
  }, [image] );

  const checkSpeciesSeen = useCallback( async ( species ) => {
    const date = await fetchSpeciesSeenDate( species.taxon.id );
    if ( date !== null ) {
      dispatch( { type: "SPECIES_SEEN", date } );
    }
    setOnlineVisionSpeciesResults( species );
  }, [] );

  const setOnlineVisionSpeciesResults = ( species ) => {
    const taxa = species.taxon;
    const obs = species;

    const newTaxon = createOnlineSpecies( taxa );
    dispatch( { type: "SET_SPECIES", obs, newTaxon } );
  };

  const setAncestor = ( ancestor ) => {
    if ( !ancestor ) { return; }
    const newTaxon = createOnlineAncestor( ancestor );
    dispatch( { type: "SET_ANCESTOR", newTaxon } );
  };

  const handleServerError = useCallback( ( response ) => {
    if ( !response ) {
      dispatch( { type: "ERROR", error: "onlineVision" } );
    }
    if ( response.status && response.status === 503 ) {
      const gmtTime = response.headers.map["retry-after"];
      const hours = serverBackOnlineTime( gmtTime );

      dispatch( { type: "ERROR", error: "downtime", numberOfHours: hours } );
    }
  }, [] );

  const addObservation = useCallback( async () => {
    if ( !observation ) { return; }
    await addToCollection( observation, image );
    if ( !image.latitude && errorCode !== null ) {
      createLocationAlert( errorCode );
    }
  }, [observation, image, errorCode] );

  const checkForMatches = () => dispatch( { type: "CLICKED" } );

  const navToResults = useCallback( () => {
    navToMatch( navigation, taxon, image, seenDate );
  }, [navigation, taxon, image, seenDate] );

  const showResults = useCallback( async () => {
    if ( newObs ) {
      await addObservation();
      navToResults();
    } else {
      navToResults();
    }
  }, [navToResults, newObs, addObservation] );

  const fetchScore = useCallback( ( parameters ) => {
    const token = createJwtToken();
    const options = { api_token: token, user_agent: createUserAgent() };

    inatjs.computervision.score_image( parameters, options ).then( ( response ) => {
      const species = response.results[0];
      const commonAncestor = response.common_ancestor;

      if ( species.combined_score > 85 && species.taxon.rank === "species" ) {
        checkSpeciesSeen( species );
      } else if ( commonAncestor ) {
        const rankLevel = commonAncestor.taxon.rank_level;
        const primaryRank = checkCommonAncestorRank( rankLevel );

        if ( primaryRank ) {
          setAncestor( commonAncestor.taxon );
        } else {
          // roll up to the nearest primary rank instead of showing sub-ranks
          // this better matches what we do on the AR camera
          const { ancestorTaxa } = species.taxon;
          const nearestTaxon = findNearestPrimaryRankTaxon( ancestorTaxa, rankLevel );
          setAncestor( nearestTaxon );
        }
      } else {
        dispatch( { type: "NO_MATCH" } );
      }
    } ).catch( ( { response } ) => {
      handleServerError( response );
    } );
  }, [handleServerError, checkSpeciesSeen] );

  const getParamsForOnlineVision = useCallback( async () => {
    const uploadParams = await flattenUploadParameters( image );
    fetchScore( uploadParams );
  }, [fetchScore, image] );

  useEffect( () => {
    if ( !loading && clicked ) {
      showResults();
    }
  }, [loading, showResults, clicked] );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      getUserLocation(); // need this for Species Nearby This Taxon on Match Screen
      getParamsForOnlineVision();
    } );
  }, [navigation, getUserLocation, getParamsForOnlineVision] );

  if ( error ) {
    return (
      <ErrorScreen
        error={error}
        number={numberOfHours}
      />
    );
  }

  return (
    <ConfirmScreen
      updateClicked={checkForMatches}
      clicked={clicked}
      image={image.uri}
    />
  );
};

export default OnlineServerResults;
