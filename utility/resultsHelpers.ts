import { Platform } from "react-native";

import { fetchTruncatedUserLocation, fetchUserLocation, truncateCoordinates } from "./locationHelpers";
import { checkLocationPermissions } from "./androidHelpers.android";
import { log } from "../react-native-logs.config";

const logger = log.extend( "resultsHelpers.js" );

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
        logger.debug( "fetchTruncatedUserLocation resolved" );
        return { image: setImageCoords( coords, image ), errorCode: 0 };
      } else {
        const preciseCoords = await fetchUserLocation( );
        logger.debug( "fetchUserLocation resolved" );
        // if user is logged in, fetch their untruncated coords and accuracy too
        return { image: setPreciseImageCoords( preciseCoords, image ), errorCode: 0 };
      }
    } catch ( code ) {
      if ( !login ) {
        return {
          image,
          errorCode: code
        };
      } else {
        return {
          image: {
            ...image,
            preciseCoords: {
              latitude: null,
              longitude: null,
              accuracy: null
            }
          },
          errorCode: code
        };
      }
    }
  };

  if ( Platform.OS === "ios" ) {
    return await fetchLocation( );
  } else {
    const permissionAndroid = await checkLocationPermissions( );
    logger.debug( "checkLocationPermissions resolved" );
    // need to specify permission check only for android
    if ( permissionAndroid === true ) {
      return await fetchLocation( );
    } else {
      return { image, errorCode: 1 };
    }
  }
};

export {
  setImageCoords,
  fetchImageLocationOrErrorCode
};
