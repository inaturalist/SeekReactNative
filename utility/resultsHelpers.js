import iconicTaxaIds from "./dictionaries/iconicTaxonDictById";

const setAncestorIdsiOS = ( predictions ) => {
  // adding ancestor ids to take iOS camera experience offline
  const ancestorIds = predictions.map( ( p ) => Number( p.taxon_id ) );
  return ancestorIds.sort( );
};

const setSpeciesSeenImage = ( taxa ) => {
  return taxa && taxa.taxon_photos[0] ? taxa.taxon_photos[0].photo.medium_url : null;
};

const createAncestor = ( ancestor, taxa ) => {
  return {
    taxaId: ancestor.taxon_id,
    speciesSeenImage: setSpeciesSeenImage( taxa ),
    scientificName: ancestor.name,
    rank: ancestor.rank
  };
};

const createSpecies = ( species, taxa ) => {
  return {
    taxaId: Number( species.taxon_id ),
    speciesSeenImage: setSpeciesSeenImage( taxa ),
    scientificName: species.name
  };
};

const checkForSpecies = ( predictions, threshold ) => {
  return predictions.find( leaf => (
    leaf.rank === 10 && leaf.score > threshold
  ) );
};

const checkForAncestor = ( predictions, threshold ) => {
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

const createObservationForRealm = ( species, taxa ) => {
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

const checkCommonAncestorRank = ( rank ) => {
  const primaryRanks = [20, 30, 40, 50];

  if ( primaryRanks.includes( rank ) ) {
    return true;
  }
  return false;
};

const createOnlineAncestor = ( ancestor ) => {
  const photo = ancestor.default_photo;

  return {
    taxaId: ancestor.id,
    speciesSeenImage: photo ? photo.medium_url : null,
    scientificName: ancestor.name,
    rank: ancestor.rank_level
  };
};

const createOnlineSpecies = ( species ) => {
  const photo = species.default_photo;

  return {
    taxaId: species.id,
    speciesSeenImage: photo ? photo.medium_url : null,
    scientificName: species.name
  };
};

// shared online and offline
const navToMatch = async ( navigation, taxon, image, seenDate, errorCode ) => {
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
};

const setImageCoords = ( coords, image ) => {
  if ( coords )  {
    const { latitude, longitude, accuracy } = coords;

    image.latitude = latitude;
    image.longitude = longitude;
    image.accuracy = accuracy;
  }

  return image;
};

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
  setImageCoords
};
