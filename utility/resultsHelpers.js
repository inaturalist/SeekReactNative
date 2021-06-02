// @flow
import { Platform } from "react-native";

import { fetchTruncatedUserLocation, fetchUserLocation, truncateCoordinates } from "./locationHelpers";
import { checkLocationPermissions } from "./androidHelpers.android";

// online results helpers
const findNearestPrimaryRankTaxon = ( ancestors: Array<Object>, rank: number ): ?Array<Object> => {
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

const checkCommonAncestorRank = ( rank: number ): boolean => {
  const primaryRanks = [20, 30, 40, 50];

  if ( primaryRanks.includes( rank ) ) {
    return true;
  }
  return false;
};

const setImageCoords = (
  coords?: {
    latitude: number,
    longitude: number
  },
  image: Object
): Object => {
  if ( coords )  {
    image.latitude = coords.latitude;
    image.longitude = coords.longitude;
  }

  return image;
};

const setPreciseImageCoords = (
  coords?: {
    latitude: number,
    longitude: number,
    accuracy: number
  },
  image: Object
): Object => {
  if ( coords )  {
    // keeping the lat/lng that we store in realm truncated even if the user is logged in
    image.latitude = truncateCoordinates( coords.latitude );
    image.longitude = truncateCoordinates( coords.longitude );

    // preciseCoords are only used by PostScreen / upload to iNat flow
    image.preciseCoords = coords;
  }

  return image;
};

// this is only being called from AR camera
const fetchImageLocationOrErrorCode = async ( image: {
  time: number,
  uri: string,
  predictions: Array<Object>
}, login: ?string ): Promise<{ image: Object, errorCode: number }> => {
  const fetchLocation = async ( ) => {
    try {
      if ( !login ) {
        const coords = await fetchTruncatedUserLocation( );
        // Alert.alert( "", JSON.stringify( coords ) );
        return { image: setImageCoords( coords, image ), errorCode: 0 };
      } else {
        const preciseCoords = await fetchUserLocation( );
        // console.log( preciseCoords, "fetching precise coords" );
        // if user is logged in, fetch their untruncated coords and accuracy too
        return { image: setPreciseImageCoords( preciseCoords, image ), errorCode: 0 };
      }
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

export {
  findNearestPrimaryRankTaxon,
  checkCommonAncestorRank,
  setImageCoords,
  fetchImageLocationOrErrorCode
};
