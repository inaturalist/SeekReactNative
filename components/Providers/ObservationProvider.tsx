import React, { useState, useEffect, useCallback, useRef } from "react";
import { Platform } from "react-native";
import inatjs from "inaturalistjs";

import iconicTaxaIds from "../../utility/dictionaries/iconicTaxonDictById";
import { fetchSpeciesSeenDate, serverBackOnlineTime } from "../../utility/dateHelpers";
import { addToCollection } from "../../utility/observationHelpers";
import { createLocationAlert } from "../../utility/locationHelpers";
import { flattenUploadParameters } from "../../utility/photoHelpers";
import { createJwtToken } from "../../utility/helpers";
import {
  findNearestPrimaryRankTaxon,
  checkCommonAncestorRank
} from "../../utility/resultsHelpers";

interface Prediction {
  name: string;
  taxon_id: number;
  rank_level: number;
  score: number;
  ancestor_ids?: number[];
}
export interface Observation {
  image: {
    predictions: Prediction[];
    onlineVision: boolean;
    errorCode: number;
    latitude: number;
    longitude: number;
    uri: string;
    time: number;
  };
  taxon: {
    taxaId?: number;
    speciesSeenImage?: string;
    scientificName?: string;
    rank?: any;
    seenDate?: string;
  } | undefined;
  clicked: boolean;
}
const ObservationContext = React.createContext<
  {
    observation: Observation | null;
    setObservation: React.Dispatch<React.SetStateAction<any>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<any>>;
  } | undefined
>( undefined );

type ObservationProviderProps = {children: React.ReactNode}
const ObservationProvider = ( { children }: ObservationProviderProps ) => {
  const [observation, setObservation] = useState<Observation | null>( null );
  const [error, setError] = useState<string | null>( null );
  const value = { observation, setObservation, error, setError };

  const threshold = 0.7;

  const checkForSpecies = ( predictions: Prediction[] ) => predictions.find( leaf => leaf.rank_level === 10 && leaf.score > threshold ) || null;

  const checkForAncestor = ( predictions: Prediction[] ) => {
    const reversePredictions = predictions.sort( ( a, b ) => a.rank_level - b.rank_level );
    const ancestor = reversePredictions.find( leaf => leaf.score > threshold );

    if ( ancestor && ancestor.rank_level !== 100 ) {
      return ancestor;
    }
    return null;
  };

  // TODO: this should happen in the camera plugin
  const setAncestorIdsiOS = ( predictions: Prediction[] ) => {
    // adding ancestor ids to take iOS camera experience offline
    const ancestorIds = predictions.map( ( p ) => Number( p.taxon_id ) );
    return ancestorIds.sort( );
  };

  const checkForIconicTaxonId = ( ancestorIds: number[] ) => {
    const taxaIdList = Object.keys( iconicTaxaIds ).reverse( );
    taxaIdList.pop( );
    taxaIdList.push( 47686, 48222 ); // checking for protozoans and kelp

    const idList = taxaIdList.map( id => Number( id ) );
    const iconicTaxonId = idList.filter( ( _v ) => ancestorIds.indexOf( _v ) !== -1 );
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

  const currentSpeciesID = useRef<number | null>( null );
  const handleSpecies = useCallback( async ( param: Prediction ) => {
    if ( !observation ) { return; }
    const { predictions, errorCode, latitude } = observation.image;
    const species = Object.assign( { }, param );

    if ( Platform.OS === "ios" && !species.ancestor_ids ) {
      species.ancestor_ids = setAncestorIdsiOS( predictions );
    }

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

    // Only run this once for a given species because fetchSpeciesSeenDate throws an error in
    // a C++ library of realm if the function is called twice. Even though this error only happens
    // for the first time a user observes a species that counts towards a challenge, having this check
    // here does not have any negative effects on the app I think.
    if ( currentSpeciesID.current === species.taxon_id ) {
      currentSpeciesID.current = null;
      return;
    } else {
      currentSpeciesID.current = species.taxon_id;
    }
    const seenDate = await fetchSpeciesSeenDate( Number( species.taxon_id ) );
    const mediumPhoto = await fetchPhoto( species.taxon_id );

    if ( !seenDate ) {
      const newObs = createObservationForRealm( );
      await addToCollection( newObs, observation.image );

      // also added to online server results
      if ( !latitude && errorCode !== 0 ) {
        createLocationAlert( errorCode );
      }
    }
    const taxon = createSpecies( mediumPhoto, seenDate );
    return taxon;
  }, [observation, fetchPhoto] );

  const handleAncestor = useCallback( async ( ancestor: Prediction ) => {
    const photo = await fetchPhoto( ancestor.taxon_id );

    return {
      taxaId: ancestor.taxon_id,
      speciesSeenImage: photo,
      scientificName: ancestor.name,
      rank: ancestor.rank_level
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

    const updateObs = ( taxon: {
      taxaId?: any;
      speciesSeenImage?: any;
      scientificName?: any;
      rank?: any;
    } | undefined ) => {
      if ( !isCurrent ) { return; }

      const prevTaxon = observation && observation.taxon;

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

  // In principle, this code should only run for the legacy camera because vision-plugin now works completely offline
  // for predictions from gallery images and camera on Android and iOS, so I disregard TS errors here.
  const createOnlineSpecies = ( species, seenDate ) => {
    const photo = species.default_photo;

    return {
      taxaId: species.id,
      speciesSeenImage: photo ? photo.medium_url : null,
      scientificName: species.name,
      seenDate
    };
  };

  // In principle, this code should only run for the legacy camera because vision-plugin now works completely offline
  // for predictions from gallery images and camera on Android and iOS, so I disregard TS errors here.
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

  // In principle, this code should only run for the legacy camera because vision-plugin now works completely offline
  // for predictions from gallery images and camera on Android and iOS, so I disregard TS errors here.
  const handleOnlineSpecies = useCallback( async ( species ) => {
    const seenDate = await fetchSpeciesSeenDate( Number( species.taxon.id ) );
    if ( !observation ) { return; }

    if ( !seenDate ) {
      await addToCollection( species, observation.image );
    }

    return createOnlineSpecies( species.taxon, seenDate );
  }, [observation] );

  // In principle, this code should only run for the legacy camera because vision-plugin now works completely offline
  // for predictions from gallery images and camera on Android and iOS, so I disregard TS errors here.
  const handleOnlineAncestor = useCallback( async ( ancestor ) => createOnlineAncestor( ancestor ), [] );

  // In principle, this code should only run for the legacy camera because vision-plugin now works completely offline
  // for predictions from gallery images and camera on Android and iOS, so I disregard TS errors here.
  const handleServerError = useCallback( ( response ) => {
    if ( !response ) {
      return { error: "onlineVision" };
    } else if ( response.status && response.status === 503 ) {
      const gmtTime = response.headers.map["retry-after"];
      const hours = serverBackOnlineTime( gmtTime );
      return { error: "downtime", numberOfHours: hours };
    }
  }, [] );

  // In principle, this code should only run for the legacy camera because vision-plugin now works completely offline
  // for predictions from gallery images and camera on Android and iOS, so I disregard TS errors here.
  // this is for online predictions (only iOS photo library uploads)
  useEffect( ( ) => {
    let isCurrent = true;
    if ( Platform.OS === "android" ) { return; }

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
      const options = { api_token: token };

      try {
        const r = await inatjs.computervision.score_image( uploadParams, options );
        if ( r.results.length === 0 ) {
          updateObs( { } );
          return;
        }

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

    if ( image.predictions.length === 0 && !observation.taxon ) {
      fetchOnlineVisionResults( );
    }
  }, [observation, handleOnlineSpecies, handleOnlineAncestor, handleServerError] );

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
