// @flow
import { Platform } from "react-native";
import inatjs from "inaturalistjs";

import iconicTaxaIds from "./dictionaries/iconicTaxonDictById";
import createUserAgent from "./userAgent";
import { fetchSpeciesSeenDate } from "./dateHelpers";
import { addToCollection } from "./observationHelpers";
import { fetchTruncatedUserLocation, createLocationAlert } from "./locationHelpers";
import { checkLocationPermissions } from "./androidHelpers.android";

const setAncestorIdsiOS = ( predictions: Array<Object> ): Array<number> => {
  // adding ancestor ids to take iOS camera experience offline
  const ancestorIds = predictions.map( ( p ) => Number( p.taxon_id ) );
  return ancestorIds.sort( );
};

const setSpeciesSeenImage = ( taxa ) => {
  return taxa && taxa.taxon_photos[0] ? taxa.taxon_photos[0].photo.medium_url : null;
};

const createAncestor = ( ancestor: {
  taxon_id: number,
  name: string,
  rank: number
}, taxa: ?{
  taxon_photos: Array<Object>
} ) => {
  return {
    taxaId: ancestor.taxon_id,
    speciesSeenImage: setSpeciesSeenImage( taxa ),
    scientificName: ancestor.name,
    rank: ancestor.rank
  };
};

const createSpecies = ( species: {
  taxon_id: number,
  name: string
}, taxa: ?{
  taxon_photos: Array<Object>
} ) => {
  return {
    taxaId: Number( species.taxon_id ),
    speciesSeenImage: setSpeciesSeenImage( taxa ),
    scientificName: species.name
  };
};

const checkForSpecies = ( predictions: Array<Object>, threshold: number ) => {
  return predictions.find( leaf => (
    leaf.rank === 10 && leaf.score > threshold
  ) );
};

const checkForAncestor = ( predictions: Array<Object>, threshold: number ) => {
  const reversePredictions = predictions.reverse();
  const ancestor = reversePredictions.find( leaf => leaf.score > threshold );

  if ( ancestor && ancestor.rank !== 100 ) {
    return ancestor;
  }
  return null;
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

const createObservationForRealm = ( species: {
  taxon_id: number,
  name: string,
  ancestor_ids: Array<number>
}, taxa: ?{
  default_photo?: ?Object
} ) => {
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

// online results helpers
const findNearestPrimaryRankTaxon = ( ancestors: Array<Object>, rank: number ) => {
  if ( rank <= 20 ) {
    return ancestors.find( r => r.rank_level === 20 );
  } else if ( rank <= 30 ) {
    return ancestors.find( r => r.rank_level === 30 );
  } else if ( rank <= 40 ) {
    return ancestors.find( r => r.rank_level === 40 );
  } else if ( rank <= 50 ) {
    return ancestors.find( r => r.rank_level === 50 );
  }
};

const checkCommonAncestorRank = ( rank: number ) => {
  const primaryRanks = [20, 30, 40, 50];

  if ( primaryRanks.includes( rank ) ) {
    return true;
  }
  return false;
};

const createOnlineAncestor = ( ancestor: {
  id: number,
  name: string,
  default_photo: Object,
  rank_level: number
} ) => {
  const photo = ancestor.default_photo;

  return {
    taxaId: ancestor.id,
    speciesSeenImage: photo ? photo.medium_url : null,
    scientificName: ancestor.name,
    rank: ancestor.rank_level
  };
};

const createOnlineSpecies = ( species: {
  id: number,
  name: string,
  default_photo: Object
} ) => {
  const photo = species.default_photo;

  return {
    taxaId: species.id,
    speciesSeenImage: photo ? photo.medium_url : null,
    scientificName: species.name
  };
};

// shared online and offline
const navToMatch = async (
  navigation: any,
  taxon: {
    taxaId?: number,
    speciesSeenImage?: ?string,
    scientificName?: string,
    rank?: number
  },
  image: {
    time: number,
    uri: string,
    predictions: Array<Object>,
    latitude?: ?number,
    longitude?: ?number
  },
  seenDate: ?string
) => {
  navigation.push( "Drawer", {
    screen: "Match",
    params: {
      taxon,
      image,
      seenDate
    }
  } );
};

const setImageCoords = ( coords?: { latitude: number, longitude: number }, image: Object ) => {
  if ( coords )  {
    image.latitude = coords.latitude;
    image.longitude = coords.longitude;
  }

  return image;
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

const fetchImageLocationOrErrorCode = async ( image: {
  latitude?: ?number
} ): Promise<{ image: Object, errorCode: number }> => {
  if ( image.latitude ) { return { image, errorCode: 0 }; }

  const fetchLocation = async ( ) => {
    try {
      const coords = await fetchTruncatedUserLocation( );
      return { image: setImageCoords( coords, image ), errorCode: 0 };
    } catch ( code ) {
      return { image, errorCode: code };
    }
  };

  if ( Platform.OS === "ios" ) {
    return await fetchLocation( );
  } else {
    const permissionAndroid = await checkLocationPermissions( );
    // need to specify permission check only for android
    if ( permissionAndroid === true ) {
      return await fetchLocation( );
    } else {
      return { image, errorCode: 1 };
    }
  }
};

const fetchOfflineResults = async ( userImage: {
  time: number,
  uri: string,
  predictions: Array<Object>,
  latitude?: ?number,
  longitude?: ?number
}, navigation: any ) => {
  const threshold = 0.7;

  // AR camera photos don't come with a location
  // especially when user has location permissions off
  // this is also needed for ancestor screen, species nearby
  const { image, errorCode } = await fetchImageLocationOrErrorCode( userImage );

  // get user location (for species nearby on match screen) || obs for realm
  const species = checkForSpecies( userImage.predictions, threshold );
  const ancestor = checkForAncestor( userImage.predictions, threshold );

  if ( species ) {
    if ( Platform.OS === "ios" ) {
      species.ancestor_ids = setAncestorIdsiOS( image.predictions );
    }

    const seenDate = await fetchSpeciesSeenDate( Number( species.taxon_id ) );
    const taxa = await fetchPhoto( species.taxon_id );

    if ( !seenDate ) {
      const newObs = createObservationForRealm( species, taxa );
      await addToCollection( newObs, image );

      // also added to online server results
      if ( !image.latitude && errorCode !== 0 ) {
        createLocationAlert( errorCode );
      }
    }
    const taxon = createSpecies( species, taxa );
    navToMatch( navigation, taxon, image, seenDate );

  } else if ( ancestor ) {
    const taxa = await fetchPhoto( ancestor.taxon_id );
    const taxon = createAncestor( ancestor, taxa );
    navToMatch( navigation, taxon, image, null );
  } else {
    // no match
    navToMatch( navigation, { }, userImage, null );
  }
};

// const fetchOnlineResults = async ( userImage: {
//   time: number,
//   uri: string,
//   predictions: Array<Object>,
//   latitude?: ?number,
//   longitude?: ?number
// },
//   navigation: any,
//   response: {
//     results: Array<Object>,
//     common_ancestor?: {
//       id: number,
//       name: string,
//       default_photo: Object,
//       rank_level: number,
//       taxon: Object
//     }
//   }
// ) => {
//   // iOS camera roll photos don't come with a location
//   // this is also needed for ancestor screen, species nearby
//   const { image, errorCode } = await fetchImageLocationOrErrorCode( userImage );

//   const species = response.results[0];
//   const ancestor = response.common_ancestor;

//   const isSpecies = species.combined_score > 85 && species.taxon.rank === "species";

//   if ( isSpecies ) {
//     const seenDate = await fetchSpeciesSeenDate( species.taxon.id );
//     const taxon = createOnlineSpecies( species.taxon );

//     if ( !seenDate ) {
//       const obs = species;
//       await addToCollection( obs, image );

//       // also added to online server results
//       if ( !image.latitude && errorCode !== 0 ) {
//         createLocationAlert( errorCode );
//       }
//     }
//     console.log( isSpecies, "is species" );
//     // navToMatch( navigation, taxon, image, seenDate );
//   } else if ( ancestor ) {
//     const rankLevel = ancestor.taxon.rank_level;
//     const primaryRank = checkCommonAncestorRank( rankLevel );

//     if ( primaryRank ) {
//       const taxon = createOnlineAncestor( ancestor );
//       // navToMatch( navigation, taxon, image, null );
//     } else {
//       // roll up to the nearest primary rank instead of showing sub-ranks
//       // this better matches what we do on the AR camera
//       const { ancestorTaxa } = species.taxon;
//       const nearestTaxon = findNearestPrimaryRankTaxon( ancestorTaxa, rankLevel );
//       // navToMatch( navigation, nearestTaxon || { }, image, null );
//     }
//     console.log( ancestor, "is ancestor" );
//   } else {
//     console.log( "is nothing" );
//     // no match
//     navToMatch( navigation, { }, userImage, null );
//   }
// };

export {
  setAncestorIdsiOS,
  createSpecies,
  createAncestor,
  checkForSpecies,
  checkForAncestor,
  createObservationForRealm,
  findNearestPrimaryRankTaxon,
  checkCommonAncestorRank,
  createOnlineSpecies,
  createOnlineAncestor,
  navToMatch,
  setImageCoords,
  fetchOfflineResults,
  // fetchOnlineResults,
  fetchImageLocationOrErrorCode
};
