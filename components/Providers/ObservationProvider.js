// @flow

import React, { useState, useEffect, useCallback } from "react";
import NetInfo from "@react-native-community/netinfo";
import type { Node } from "react";
import { Platform } from "react-native";
import inatjs from "inaturalistjs";

import iconicTaxaIds from "../../utility/dictionaries/iconicTaxonDictById";
import createUserAgent from "../../utility/userAgent";
import { fetchSpeciesSeenDate, serverBackOnlineTime } from "../../utility/dateHelpers";
import { addToCollection } from "../../utility/observationHelpers";
import { createLocationAlert } from "../../utility/locationHelpers";
import { ObservationContext } from "../UserContext";
import { flattenUploadParameters } from "../../utility/photoHelpers";
import { createJwtToken } from "../../utility/helpers";
import {
  findNearestPrimaryRankTaxon,
  checkCommonAncestorRank
} from "../../utility/resultsHelpers";
type Props = {
  children: any
}

const ObservationProvider = ( { children }: Props ): Node => {
  const [connected, setConnected] = useState( null );
  const [observation, setObservation] = useState( null );
  const [error, setError] = useState( null );
  const observationValue = { observation, setObservation, error, setError };

  const threshold = 0.7;

  const checkForSpecies = predictions => predictions.find( leaf => (
    leaf.rank === 10 && leaf.score > threshold
  ) );

  const checkForAncestor = predictions => {
    const reversePredictions = predictions.reverse();
    const ancestor = reversePredictions.find( leaf => leaf.score > threshold );

    if ( ancestor && ancestor.rank !== 100 ) {
      return ancestor;
    }
    return null;
  };

  const setAncestorIdsiOS = predictions => {
    // adding ancestor ids to take iOS camera experience offline
    const ancestorIds = predictions.map( ( p ) => Number( p.taxon_id ) );
    return ancestorIds.sort( );
  };

  const checkForIconicTaxonId = ancestorIds => {
    const taxaIdList = Object.keys( iconicTaxaIds ).reverse( );
    taxaIdList.pop( );
    taxaIdList.push( 47686, 48222 ); // checking for protozoans and kelp

    const idList = taxaIdList.map( id => Number( id ) );
    const iconicTaxonId = idList.filter( ( value ) => ancestorIds.indexOf( value ) !== -1 );
    return iconicTaxonId[0] || 1;
  };

  const fetchPhoto = useCallback( async ( id ) => {
    const options = { user_agent: createUserAgent( ) };

    if ( !connected ) { return null; }

    try {
      const { results } = await inatjs.taxa.fetch( id, options );
      const taxa = results[0];
      const defaultPhoto = taxa && taxa.default_photo && taxa.default_photo.medium_url
        ? taxa.default_photo.medium_url
        : null;
      return connected ? defaultPhoto : null;
    } catch ( e ) {
      return null;
    }
  }, [connected] );

  const handleSpecies = useCallback( async ( species ) => {
    const createSpecies = ( photo, seenDate ) => {
      return {
        taxaId: Number( species.taxon_id ),
        speciesSeenImage: photo,
        scientificName: species.name,
        seenDate
      };
    };

    const createObservationForRealm = photo => {
      return {
        taxon: {
          default_photo: {
            medium_url: photo
          },
          id: Number( species.taxon_id ),
          name: species.name,
          iconic_taxon_id: checkForIconicTaxonId( species.ancestor_ids ),
          ancestor_ids: species.ancestor_ids
        }
      };
    };

    if ( !observation ) { return; }
    const { predictions, errorCode, latitude } = observation.image;

    if ( Platform.OS === "ios" ) {
      species.ancestor_ids = setAncestorIdsiOS( predictions );
    }

    const seenDate = await fetchSpeciesSeenDate( Number( species.taxon_id ) );
    const mediumPhoto = await fetchPhoto( species.taxon_id );

    if ( !seenDate ) {
      const newObs = createObservationForRealm( mediumPhoto );
      await addToCollection( newObs, observation.image );

      // also added to online server results
      if ( !latitude && errorCode !== 0 ) {
        createLocationAlert( errorCode );
      }
    }
    const taxon = createSpecies( mediumPhoto, seenDate );
    return taxon;
  }, [observation, fetchPhoto] );

  const handleAncestor = useCallback( async ( ancestor ) => {
    const photo = await fetchPhoto( ancestor.taxon_id );

    return {
      taxaId: ancestor.taxon_id,
      speciesSeenImage: photo,
      scientificName: ancestor.name,
      rank: ancestor.rank
    };
  }, [fetchPhoto] );

  // this is for offline predictions
  useEffect( ( ) => {
    let isCurrent = true;

    if ( observation === null ) { return; }
    const { image } = observation;

    if ( !image
      || !image.predictions
      || image.onlineVision
    ) {
      return;
    }

    const updateObs = taxon => {
      if ( !isCurrent ) { return; }

      const prevTaxon = observation.taxon;

      if ( !prevTaxon
        || taxon && taxon.taxaId && ( prevTaxon.taxaId !== taxon.taxaId ) ) {
        setObservation( {
          ...observation,
          taxon
        } );
      }
    };

    const checkForMatch = async ( ) => {
      const { predictions } = observation.image;

      const species = checkForSpecies( predictions );
      const ancestor = checkForAncestor( predictions );

      if ( species ) {
        const taxon = await handleSpecies( species );
        updateObs( taxon );
      } else if ( ancestor ) {
        const taxon = await handleAncestor( ancestor );
        updateObs( taxon );
      } else {
        updateObs( { } );
      }
    };

    checkForMatch( );

    return ( ) => {
      isCurrent = false;
    };
  }, [observation, handleSpecies, handleAncestor] );

  const createOnlineSpecies = ( species, seenDate ) => {
    const photo = species.default_photo;

    return {
      taxaId: species.id,
      speciesSeenImage: photo ? photo.medium_url : null,
      scientificName: species.name,
      seenDate
    };
  };

  const createOnlineAncestor = ( ancestor: Object ) => {
    if ( !ancestor ) { return; }
    const photo = ancestor.default_photo;

    return {
      taxaId: ancestor.id,
      speciesSeenImage: photo ? photo.medium_url : null,
      scientificName: ancestor.name,
      rank: ancestor.rank_level
    };
  };

  const handleOnlineSpecies = useCallback( async ( species ) => {
    const seenDate = await fetchSpeciesSeenDate( Number( species.taxon.id ) );
    if ( !observation ) { return; }

    if ( !seenDate ) {
      await addToCollection( species, observation.image );
    }

    return createOnlineSpecies( species.taxon, seenDate );
  }, [observation] );

  const handleOnlineAncestor = useCallback( async ( ancestor ) => createOnlineAncestor( ancestor ), [] );

  const handleServerError = useCallback( ( response ) => {
    if ( !response ) {
      return { error: "onlineVision" };
    } else if ( response.status && response.status === 503 ) {
      const gmtTime = response.headers.map["retry-after"];
      const hours = serverBackOnlineTime( gmtTime );
      return { error: "downtime", numberOfHours: hours };
    }
  }, [] );

  // this is for online predictions (only iOS photo library uploads)
  useEffect( ( ) => {
    let isCurrent = true;

    if ( !observation ) { return; }
    const { image, clicked } = observation;

    if ( !image
      || !clicked
      || !image.onlineVision
    ) {
      return;
    }

    const updateObs = ( taxon ) => {
      if ( !isCurrent ) { return; }

      const prevTaxon = observation.taxon;

      if ( !prevTaxon
        || taxon && taxon.taxaId && ( prevTaxon.taxaId !== taxon.taxaId ) ) {
        setObservation( {
          ...observation,
          taxon
        } );
      }
    };

    const fetchOnlineVisionResults = async ( ) => {
      const uploadParams = await flattenUploadParameters( image );
      const token = createJwtToken( );
      const options = { api_token: token, user_agent: createUserAgent() };

      try {
        const r = await inatjs.computervision.score_image( uploadParams, options );
        if ( r.results.length === 0 ) { return null; }

        const taxa = r.results[0];
        const ancestor = r.common_ancestor;

        if ( taxa && taxa.combined_score > 85 && taxa.taxon.rank === "species" ) {
          const taxon = await handleOnlineSpecies( taxa );
          updateObs( taxon );
        } else if ( ancestor ) {
          const rankLevel = ancestor.taxon.rank_level;
          const primaryRank = checkCommonAncestorRank( rankLevel );

          if ( primaryRank ) {
            const taxon = await handleOnlineAncestor( ancestor.taxon );
            updateObs( taxon );
          } else {
            // roll up to the nearest primary rank instead of showing sub-ranks
            // this better matches what we do on the AR camera
            const { ancestorTaxa } = taxa.taxon;
            const nearestTaxon = findNearestPrimaryRankTaxon( ancestorTaxa, rankLevel );
            const taxon = await handleOnlineAncestor( nearestTaxon );
            updateObs( taxon );
          }
        } else {
          updateObs( { } );
        }
      } catch ( e ) {
        const parsedError = JSON.stringify( e );
        const { response } = parsedError;
        const serverError = handleServerError( response );
        setError( serverError );
      }
    };

    if ( image.predictions.length === 0  && !observation.taxon ) {
      fetchOnlineVisionResults( );
    }
  }, [observation, handleOnlineSpecies, handleOnlineAncestor, handleServerError] );

  useEffect( ( ) => {
    // Subscribe
    const unsubscribe = NetInfo.addEventListener( state => {
      setConnected( state.isConnected );
    } );

    // Unsubscribe
    unsubscribe( );
  }, [] );

  return (
    <ObservationContext.Provider value={observationValue}>
      {children}
    </ObservationContext.Provider>
  );
};

export default ObservationProvider;
