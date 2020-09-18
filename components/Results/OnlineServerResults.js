// @flow

import React, { useState, useEffect, useCallback } from "react";
import inatjs from "inaturalistjs";
import { useNavigation, useRoute } from "@react-navigation/native";

import ConfirmScreen from "./ConfirmScreen";
import ErrorScreen from "./Error";
import {
  capitalizeNames,
  flattenUploadParameters,
  getTaxonCommonName,
  createJwtToken
} from "../../utility/helpers";
import { addToCollection } from "../../utility/observationHelpers";
import { fetchTruncatedUserLocation } from "../../utility/locationHelpers";
import createUserAgent from "../../utility/userAgent";
import { fetchSpeciesSeenDate, serverBackOnlineTime } from "../../utility/dateHelpers";

const OnlineServerResults = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const [taxon, setTaxon] = useState( {} );
  const [image, setImage] = useState( params.image );
  const [observation, setObservation] = useState( null );
  const [seenDate, setSeenDate] = useState( null );
  const [match, setMatch] = useState( null );
  const [errorCode, setLocationErrorCode] = useState( null );
  const [error, setError] = useState( null );
  const [clicked, setClicked] = useState( false );
  const [numberOfHours, setNumberOfHours] = useState( null );

  const getUserLocation = useCallback( () => {
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const { latitude, longitude, accuracy } = coords;

        image.latitude = latitude;
        image.longitude = longitude;
        image.accuracy = accuracy;

        setImage( image );
      }
    } ).catch( ( code ) => {
      setLocationErrorCode( code );
    } );
  }, [image] );

  const checkSpeciesSeen = ( taxaId ) => {
    fetchSpeciesSeenDate( taxaId ).then( ( date ) => {
      setSeenDate( date );
    } );
  };

  const setOnlineVisionSpeciesResults = ( species ) => {
    const taxa = species.taxon;
    const photo = taxa.default_photo;

    setObservation( species );

    getTaxonCommonName( taxa.id ).then( ( commonName ) => {
      const newTaxon = {
        taxaId: taxa.id,
        taxaName: capitalizeNames( commonName || taxa.name ),
        scientificName: taxa.name,
        speciesSeenImage: photo ? photo.medium_url : null
      };

      setTaxon( newTaxon );
      setMatch( true );
    } );
  };

  const setNearestPrimaryRankAncestor = ( ancestor ) => {
    const photo = ancestor.default_photo;

    getTaxonCommonName( ancestor.id ).then( ( commonName ) => {
      const newTaxon = {
        commonAncestor: ancestor
          ? capitalizeNames( commonName || ancestor.name )
          : null,
        taxaId: ancestor.id,
        speciesSeenImage: photo ? photo.medium_url : null,
        scientificName: ancestor.name,
        rank: ancestor.rank_level
      };

      setTaxon( newTaxon );
      setMatch( false );
    } );
  };

  const setOnlineVisionAncestorResults = ( commonAncestor ) => {
    const taxa = commonAncestor.taxon;
    const photo = taxa.default_photo;

    getTaxonCommonName( taxa.id ).then( ( commonName ) => {
      const newTaxon = {
        commonAncestor: commonAncestor
          ? capitalizeNames( commonName || taxa.name )
          : null,
        taxaId: taxa.id,
        speciesSeenImage: photo ? photo.medium_url : null,
        scientificName: taxa.name,
        rank: taxa.rank_level
      };

      setTaxon( newTaxon );
      setMatch( false );
    } );
  };

  const findNearestPrimaryRankTaxon = ( ancestors, rank ) => {
    let nearestTaxon = {};

    if ( rank <= 20 ) {
      nearestTaxon = ancestors.find( r => r.rank_level === 20 );
    } else if ( rank <= 30 ) {
      nearestTaxon = ancestors.find( r => r.rank_level === 30 );
    } else if ( rank <= 40 ) {
      nearestTaxon = ancestors.find( r => r.rank_level === 40 );
    } else if ( rank <= 50 ) {
      nearestTaxon = ancestors.find( r => r.rank_level === 50 );
    }

    return nearestTaxon;

  };

  const checkCommonAncestorRank = useCallback( ( rank ) => {
    const primaryRanks = [20, 30, 40, 50];

    if ( primaryRanks.includes( rank ) ) {
      return true;
    }
    return false;
  }, [] );

  const fetchScore = useCallback( ( parameters ) => {
    const token = createJwtToken();
    const options = { api_token: token, user_agent: createUserAgent() };

    inatjs.computervision.score_image( parameters, options ).then( ( response ) => {
      const species = response.results[0];
      const commonAncestor = response.common_ancestor;

      if ( species.combined_score > 85 && species.taxon.rank === "species" ) {
        checkSpeciesSeen( species.taxon.id );
        setOnlineVisionSpeciesResults( species );
      } else if ( commonAncestor ) {
        const rankLevel = commonAncestor.taxon.rank_level;
        const primaryRank = checkCommonAncestorRank( rankLevel );

        if ( primaryRank ) {
          setOnlineVisionAncestorResults( commonAncestor );
        } else {
          // roll up to the nearest primary rank instead of showing sub-ranks
          // this better matches what we do on the AR camera
          const { ancestorTaxa } = species.taxon;
          const nearestTaxon = findNearestPrimaryRankTaxon( ancestorTaxa, rankLevel );
          setNearestPrimaryRankAncestor( nearestTaxon );
        }
      } else {
        setMatch( false );
      }
    } ).catch( ( { response } ) => {
      if ( !response ) {
        setError( "onlineVision" );
      }
      if ( response.status && response.status === 503 ) {
        const gmtTime = response.headers.map["retry-after"];
        const hours = serverBackOnlineTime( gmtTime );

        if ( hours ) {
          setNumberOfHours( hours );
        }
        setError( "downtime" );
      }
    } );
  }, [checkCommonAncestorRank] );

  const addObservation = useCallback( async () => {
    await addToCollection( observation, image );
  }, [observation, image] );

  const getParamsForOnlineVision = useCallback( async () => {
    const uploadParams = await flattenUploadParameters( image );
    fetchScore( uploadParams );
  }, [fetchScore, image] );

  const checkForMatches = () => setClicked( true );

  const checkMetaData = useCallback( () => {
    // this should only apply to iOS photos with no metadata
    // once metadata is fixed, should be able to remove this check for user location
    if ( !image.latitude ) {
      getUserLocation();
      getParamsForOnlineVision();
    } else {
      getParamsForOnlineVision();
    }
  }, [image.latitude, getParamsForOnlineVision, getUserLocation] );

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
    if ( match !== null && clicked ) {
      showMatch();
    }
  }, [match, showMatch, clicked] );

  useEffect( () => {
    navigation.addListener( "focus", () => {
      checkMetaData();
    } );
  }, [navigation, checkMetaData] );



  return (
    <>
      {error ? (
        <ErrorScreen
          error={error}
          number={numberOfHours}
        />
      ) : (
         <ConfirmScreen
           updateClicked={checkForMatches}
           clicked={clicked}
           image={image.uri}
         />
      )}
    </>
  );
};

export default OnlineServerResults;
