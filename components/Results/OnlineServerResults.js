// @flow

import React, { useReducer, useEffect, useCallback, useContext } from "react";
import inatjs from "inaturalistjs";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { Node } from "react";

import ConfirmScreen from "./ConfirmScreen";
import ErrorScreen from "./Error";
import { createJwtToken } from "../../utility/helpers";
import { flattenUploadParameters } from "../../utility/photoHelpers";
import { addToCollection } from "../../utility/observationHelpers";
import createUserAgent from "../../utility/userAgent";
import { fetchSpeciesSeenDate, serverBackOnlineTime } from "../../utility/dateHelpers";
import {
  findNearestPrimaryRankTaxon,
  checkCommonAncestorRank,
  createOnlineSpecies,
  createOnlineAncestor,
  navToMatch
} from "../../utility/resultsHelpers";
import { ObservationContext } from "../UserContext";

const OnlineServerResults = (): Node => {
  const { setObservation } = useContext( ObservationContext );
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
    seenDate,
    observation,
    error,
    clicked,
    numberOfHours
  } = state;

  const newObs = observation && !seenDate;

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
    } else if ( response.status && response.status === 503 ) {
      const gmtTime = response.headers.map["retry-after"];
      const hours = serverBackOnlineTime( gmtTime );

      dispatch( { type: "ERROR", error: "downtime", numberOfHours: hours } );
    }
  }, [] );

  const addObservation = useCallback( async () => {
    if ( !observation ) { return; }
    await addToCollection( observation, image );
    // if ( !image.latitude && errorCode !== null ) {
    //   createLocationAlert( errorCode );
    // }
  }, [observation, image] );

  const checkForMatches = () => dispatch( { type: "CLICKED" } );

  const navToResults = useCallback( () => {
    setObservation( { image } );
    navToMatch( navigation, taxon, seenDate );
  }, [navigation, taxon, image, seenDate, setObservation] );

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
      if ( response.results.length === 0 ) {
        dispatch( { type: "NO_MATCH" } );
        return;
      }

      const species = response.results[0];
      const commonAncestor = response.common_ancestor;

      if ( species && species.combined_score > 85 && species.taxon.rank === "species" ) {
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
    } ).catch( ( err ) => {
      const { response } = err;
      handleServerError( response );
    } );
  }, [handleServerError, checkSpeciesSeen] );

  const getParamsForOnlineVision = useCallback( async () => {
    const uploadParams = await flattenUploadParameters( image );
    fetchScore( uploadParams );
  }, [fetchScore, image] );

  useEffect( () => {
    if ( !loading && clicked ) {
      showResults( );
    }
  }, [loading, showResults, clicked] );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      getParamsForOnlineVision();
    } );
  }, [navigation, getParamsForOnlineVision] );

  if ( error && clicked ) {
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
