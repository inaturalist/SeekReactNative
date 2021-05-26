// @flow

import React, { useState, useEffect, useCallback } from "react";
// import { useNetInfo } from "@react-native-community/netinfo";
import type { Node } from "react";
import { Platform } from "react-native";
import inatjs from "inaturalistjs";

import iconicTaxaIds from "../../utility/dictionaries/iconicTaxonDictById";
import createUserAgent from "../../utility/userAgent";
import { fetchSpeciesSeenDate } from "../../utility/dateHelpers";
import { addToCollection } from "../../utility/observationHelpers";
import { createLocationAlert } from "../../utility/locationHelpers";

import { ObservationContext } from "../UserContext";

type Props = {
  children: any
}

const ObservationProvider = ( { children }: Props ): Node => {
  const [observation, setObservation] = useState( null );
  const observationValue = { observation, setObservation };

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

  const checkForIconicTaxonId = ( ancestorIds: Array<number> ) => {
    const taxaIdList = Object.keys( iconicTaxaIds ).reverse();
    taxaIdList.pop();
    taxaIdList.push( 47686, 48222 ); // checking for protozoans and kelp

    const newTaxaList = [];

    taxaIdList.forEach( ( id ) => {
      newTaxaList.push( Number( id ) );
    } );

    const iconicTaxonId = newTaxaList.filter( ( value ) => ancestorIds.indexOf( value ) !== -1 );

    return iconicTaxonId[0] || 1;
  };

  const setSpeciesSeenImage = ( taxa ) => {
    return taxa && taxa.taxon_photos[0] ? taxa.taxon_photos[0].photo.medium_url : null;
  };

  const fetchPhoto = async ( id: number ) => {
    const options = { user_agent: createUserAgent( ) };

    try {
      const { results } = await inatjs.taxa.fetch( id, options );
      const taxa = results[0];
      return taxa;
    } catch ( e ) {
      return null;
    }
  };

  const handleSpecies = useCallback( async ( species ) => {
    const createSpecies = ( taxa, seenDate ) => {
      return {
        taxaId: Number( species.taxon_id ),
        speciesSeenImage: setSpeciesSeenImage( taxa ),
        scientificName: species.name,
        seenDate
      };
    };

    const createObservationForRealm = taxa => {
      return {
        taxon: {
          default_photo: taxa && taxa.default_photo ? taxa.default_photo : null,
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
    const taxa = await fetchPhoto( species.taxon_id );

    if ( !seenDate ) {
      const newObs = createObservationForRealm( taxa );
      await addToCollection( newObs, observation.image );

      // also added to online server results
      if ( !latitude && errorCode !== 0 ) {
        createLocationAlert( errorCode );
      }
    }
    const taxon = createSpecies( taxa, seenDate );
    return taxon;
  }, [observation] );

  const handleAncestor = useCallback( async ( ancestor ) => {
    const taxa = await fetchPhoto( ancestor.taxon_id );

    return {
      taxaId: ancestor.taxon_id,
      speciesSeenImage: setSpeciesSeenImage( taxa ),
      scientificName: ancestor.name,
      rank: ancestor.rank
    };
  }, [] );

  useEffect( ( ) => {
    let isCurrent = true;

    if ( observation === null || !observation.image || !observation.image.predictions ) {
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

  return (
    <ObservationContext.Provider value={observationValue}>
      {children}
    </ObservationContext.Provider>
  );
};

export default ObservationProvider;
