import { Alert } from "react-native";
import Geocoder from "react-native-geocoder";
import OpenSettings from "react-native-open-settings";
import Geolocation from "@react-native-community/geolocation";

import i18n from "../i18n";

const fetchUserLocation = () => (
  new Promise( ( resolve ) => {
    Geolocation.getCurrentPosition( ( { coords } ) => {
      resolve( coords );
    }, () => resolve( null ) );
  } )
);

const truncateCoordinates = ( coordinate ) => {
  if ( !coordinate ) {
    return null;
  }
  return Number( coordinate.toFixed( 2 ) );
};

const fetchTruncatedUserLocation = () => (
  new Promise( ( resolve, reject ) => {
    Geolocation.getCurrentPosition( ( { coords } ) => {
      const latitude = truncateCoordinates( coords.latitude );
      const longitude = truncateCoordinates( coords.longitude );
      const truncatedCoords = {
        latitude,
        longitude
      };

      resolve( truncatedCoords );
    }, ( { code } ) => {
      reject( code );
    }, { timeout: 30000 } );
  } )
);

const fetchLocationName = ( lat, lng ) => (
  new Promise( ( resolve, reject ) => {
    Geocoder.geocodePosition( { lat, lng } ).then( ( result ) => {
      if ( result.length === 0 ) {
        resolve( null );
      }
      const { locality, subAdminArea } = result[0];
      resolve( locality || subAdminArea );
    } ).catch( ( e ) => {
      reject( e );
    } );
  } )
);

const createLocationAlert = ( errorCode ) => {
  let body;
  const button = [{ text: i18n.t( "posting.ok" ), style: "default" }];

  if ( errorCode === 1 ) {
    body = i18n.t( "results.error_location" );
    button.unshift( {
      text: i18n.t( "species_nearby.enable_location" ),
      onPress: () => OpenSettings.openSettings()
    } );
  } else if ( errorCode === 2 ) {
    body = i18n.t( "results.error_gps" );
  } else {
    body = i18n.t( "results.error_timeout" );
  }

  Alert.alert( i18n.t( "results.enable_location" ), body, button );
};

const checkForTruncatedCoordinates = ( latitude ) => {
  if ( latitude ) {
    const string = latitude.toString();
    const split = string.split( "." );

    if ( split[1] && split[1].length === 2 ) {
      return true;
    }
    return false;
  }
  return false;
};

export {
  truncateCoordinates,
  fetchUserLocation,
  fetchLocationName,
  fetchTruncatedUserLocation,
  createLocationAlert,
  checkForTruncatedCoordinates
};
