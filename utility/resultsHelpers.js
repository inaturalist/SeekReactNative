// @flow
import { Platform } from "react-native";

import { fetchTruncatedUserLocation, fetchUserLocation } from "./locationHelpers";
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
  image: Object,
  preciseCoords?: {
    latitude: number,
    longitude: number,
    accuracy: number
  }
): Object => {
  if ( coords )  {
    image.latitude = coords.latitude;
    image.longitude = coords.longitude;
  }

  if ( preciseCoords ) {
    image.preciseCoords = preciseCoords;
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
      const coords = await fetchTruncatedUserLocation( );

      if ( !login ) {
        // LOG.info( "truncated coords: ", JSON.stringify( coords ) );
        // Alert.alert( "", JSON.stringify( coords ) );
        return { image: setImageCoords( coords, image ), errorCode: 0 };
      } else {
        const preciseCoords = await fetchUserLocation( );
        // if user is logged in, fetch their untruncated coords and accuracy too
        return { image: setImageCoords( coords, image, preciseCoords ), errorCode: 0 };
      }
    } catch ( code ) {
      // LOG.info( "error code: ", code );
      // Alert.alert( "errorCode", code );
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
