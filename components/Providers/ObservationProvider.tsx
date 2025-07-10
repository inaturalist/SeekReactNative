import React, { useState, useCallback } from "react";
import inatjs from "inaturalistjs";

import { iconicTaxaIds } from "../../utility/dictionaries/taxonomyDicts";
import { fetchSpeciesSeenDate } from "../../utility/dateHelpers";
import { addToCollection } from "../../utility/observationHelpers";
import { createLocationAlert } from "../../utility/locationHelpers";

interface Prediction {
  name: string;
  taxon_id: number;
  rank_level: number;
  combined_score: number;
  ancestor_ids: number[];
}
export interface ObservationImage {
  predictions: Prediction[];
  errorCode: number;
  latitude: number;
  longitude: number;
  uri: string;
  time: number;
}
export interface Observation {
  image: ObservationImage;
  taxon?: {
    taxaId?: number;
    speciesSeenImage?: string;
    scientificName?: string;
    rank?: any;
    seenDate?: string;
  };
}
const ObservationContext = React.createContext<
  {
    observation: Observation | null;
    setObservation: React.Dispatch<React.SetStateAction<any>>;
    startObservationWithImage: ( image: ObservationImage, callback: () => void ) => void;
  } | undefined
>( undefined );

type ObservationProviderProps = {children: React.ReactNode}
const ObservationProvider = ( { children }: ObservationProviderProps ) => {
  const [observation, setObservation] = useState<Observation | null>( null );

  const threshold = 70;

  const checkForSpecies = ( predictions: Prediction[] ) => predictions.find( leaf => leaf.rank_level === 10 && leaf.combined_score > threshold ) || null;

  const checkForAncestor = ( predictions: Prediction[] ) => {
    const reversePredictions = predictions.sort( ( a, b ) => a.rank_level - b.rank_level );
    const ancestor = reversePredictions.find( leaf => leaf.combined_score > threshold );

    if ( ancestor && ancestor.rank_level !== 100 ) {
      return ancestor;
    }
    return null;
  };

  const checkForIconicTaxonId = ( ancestorIds: number[] ) => {
    const iconicTaxonId = iconicTaxaIds.filter( ( _v ) => ancestorIds.indexOf( _v ) !== -1 );
    return iconicTaxonId[0] || 1;
  };

  const fetchPhoto = useCallback( async ( id: number ) => {
    // probably should break this into a helper function to use in other places
    // like species nearby fetches for better offline experience
    const fetchWithTimeout = ( timeout: number ) => Promise.race( [
      inatjs.taxa.fetch( id ),
      new Promise( ( _, reject ) =>
          setTimeout( ( ) => reject( new Error( "timeout" ) ), timeout )
        )
    ] );

    try {
      // this will hopefully stop Seek from stalling when a user has spotty cell service;
      // if the fetch doesn't resolve in a certain number of milliseconds, no
      // default photo will be shown

      // not sure how long we really want to wait for this
      // started with 500 which was apparently too slow, now 5 seconds
      const { results } = await fetchWithTimeout( 5000 );
      const taxa: {
        default_photo: {
          medium_url: string;
        };
      } = results[0];
      const defaultPhoto = taxa && taxa.default_photo && taxa.default_photo.medium_url
        ? taxa.default_photo.medium_url
        : null;
      return defaultPhoto;
    } catch ( e ) {
      return null;
    }
  }, [] );

  const handleSpecies = async ( image: ObservationImage, param: Prediction ) => {
    const { errorCode, latitude } = image;
    const species = Object.assign( { }, param );

    const createSpecies = ( photo: string | null, seenDate: string | null ) => {
      return {
        taxaId: Number( species.taxon_id ),
        speciesSeenImage: photo,
        scientificName: species.name,
        seenDate
      };
    };

    const createObservationForRealm = () => {
      return {
        taxon: {
          id: Number( species.taxon_id ),
          name: species.name,
          iconic_taxon_id: checkForIconicTaxonId( species.ancestor_ids ),
          ancestor_ids: species.ancestor_ids
        }
      };
    };

    const seenDate = await fetchSpeciesSeenDate( Number( species.taxon_id ) );
    console.log( "fetchSpeciesSeenDate result:", seenDate );
    const mediumPhoto = await fetchPhoto( species.taxon_id );
    console.log( "fetchPhoto result:", mediumPhoto );

    if ( !seenDate ) {
      const newObs = createObservationForRealm( );
      await addToCollection( newObs, image );
      console.log( "addToCollection resolved" );

      // also added to online server results
      if ( !latitude && errorCode !== 0 ) {
        createLocationAlert( errorCode );
      }
    }
    const taxon = createSpecies( mediumPhoto, seenDate );
    return taxon;
  };

  const handleAncestor = useCallback( async ( ancestor: Prediction ) => {
    const photo = await fetchPhoto( ancestor.taxon_id );
    console.log( "fetchPhoto result:", photo );

    return {
      taxaId: ancestor.taxon_id,
      speciesSeenImage: photo,
      scientificName: ancestor.name,
      rank: ancestor.rank_level
    };
  }, [fetchPhoto] );

  const startObservationWithImage = async ( image: ObservationImage, positiveCallback?: () => void ) => {
    console.log( "Adding image to observation", image );
    if ( !image || !image.predictions ) {
      console.warn( "No predictions found in image" );
      return;
    }

    const { predictions } = image;
    const species = checkForSpecies( predictions );
    console.log( "checkForSpecies result:", species );
    const ancestor = checkForAncestor( predictions );
    console.log( "checkForAncestor result:", ancestor );
    let taxon = undefined;
    if ( species ) {
      taxon = await handleSpecies( image, species );
      console.log( "handleSpecies result:", taxon );
    } else if ( ancestor ) {
      taxon = await handleAncestor( ancestor );
      console.log( "handleAncestor result:", taxon );
    }
    setObservation( { image, taxon } );

    // At this point we were successful in adding the image and processing the predictions
    // call the positiveCallback if it exists
    if ( positiveCallback ) {
      positiveCallback( );
    }
  };

  const value = {
    observation,
    setObservation,
    startObservationWithImage
  };
  return (
    <ObservationContext.Provider value={value}>{children}</ObservationContext.Provider>
  );
};

function useObservation() {
  const context = React.useContext( ObservationContext );
  if ( context === undefined ) {
    throw new Error( "useObservation must be used within a ObservationProvider" );
  }
  return context;
}

export { ObservationProvider, useObservation };
