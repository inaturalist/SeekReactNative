import { Platform } from "react-native";

import type { Coords, TruncatedCoords } from "./locationHelpers";
import { fetchTruncatedUserLocation, fetchUserLocation, truncateCoordinates } from "./locationHelpers";
import { checkLocationPermissions } from "./androidHelpers.android";
import { log } from "../react-native-logs.config";
import type { Prediction } from "vision-camera-plugin-inatvision";

const logger = log.extend( "resultsHelpers.js" );

const setImageCoords = (
  coords: TruncatedCoords,
  image: Image,
): Image => {
  if ( coords )  {
    image.latitude = coords.latitude;
    image.longitude = coords.longitude;
  }

  return image;
};

const setPreciseImageCoords = (
  coords: Coords,
  image: Image,
): Image => {
  if ( coords )  {
    // keeping the lat/lng that we store in realm truncated even if the user is logged in
    image.latitude = truncateCoordinates( coords.latitude );
    image.longitude = truncateCoordinates( coords.longitude );

    // preciseCoords are only used by PostScreen / upload to iNat flow
    image.preciseCoords = coords;
  }

  return image;
};

interface Image {
  time: number;
  uri: string;
  predictions: Prediction[];
  latitude?: number;
  longitude?: number;
  preciseCoords?: {
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
  };
}

// this is only being called from AR camera
const fetchImageLocationOrErrorCode = async ( image: Image, login: string | null ): Promise<{ image: Image, errorCode: number }> => {
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
          errorCode: code,
        };
      } else {
        return {
          image: {
            ...image,
            preciseCoords: {
              latitude: null,
              longitude: null,
              accuracy: null,
            },
          },
          errorCode: code,
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
  fetchImageLocationOrErrorCode,
};
