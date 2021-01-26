// @flow

import { Alert, Platform } from "react-native";
import Geocoder from "react-native-geocoder";
import OpenSettings from "react-native-open-settings";
import Geolocation from "react-native-geolocation-service";

import i18n from "../i18n";

const requestiOSPermissions = async () => {
  if ( Platform.OS === "ios" ) {
    const permission = await Geolocation.requestAuthorization( "whenInUse" );
    return permission;
  }
};

const fetchUserLocation = ( enableHighAccuracy: ?boolean ) => (
  new Promise( ( resolve, reject ) => {
    requestiOSPermissions();
    Geolocation.getCurrentPosition( ( { coords } ) => {
      resolve( coords );
    }, ( { code } ) => {
      reject( code );
    }, {
      // enableHighAccuracy to use GPS instead of Wifi location (i.e. cell towers )
      // on error (particular Android devices), try again with enableHighAccuracy = false
      enableHighAccuracy,
      showLocationDialog: false
    } );
  } )
);

const truncateCoordinates = ( coordinate: number ) => {
  if ( !coordinate ) {
    return null;
  }
  return Number( coordinate.toFixed( 2 ) );
};

const fetchTruncatedUserLocation = () => (
  new Promise( ( resolve, reject ) => {
    requestiOSPermissions();
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
      // remove annoying Google location accuracy popup on older Android devices
    }, { timeout: 30000, showLocationDialog: false } );
  } )
);

const fetchLocationName = ( lat: number, lng: number ) => (
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

const createLocationAlert = ( errorCode: number ) => {
  let body;
  const button = [{ text: i18n.t( "posting.ok" ), style: "default" }];

  if ( errorCode === 1 ) {
    body = i18n.t( "results.error_location" );
    if ( Platform.OS === "android" ) {
      button.unshift( {
        text: i18n.t( "species_nearby.enable_location" ),
        onPress: () => OpenSettings.openSettings()
      } );
    }
  } else if ( errorCode === 2 ) {
    body = i18n.t( "results.error_gps" );
  } else {
    body = i18n.t( "results.error_timeout" );
  }

  Alert.alert( i18n.t( "results.enable_location" ), body, button );
};

const checkForTruncatedCoordinates = ( latitude: number ) => {
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

const createRegion = ( region ) => {
  const latitudeDelta = 0.2;
  const longitudeDelta = 0.2;

  return {
    latitude: region.latitude,
    longitude: region.longitude,
    latitudeDelta,
    longitudeDelta
  };
};

export {
  truncateCoordinates,
  fetchUserLocation,
  fetchLocationName,
  fetchTruncatedUserLocation,
  createLocationAlert,
  checkForTruncatedCoordinates,
  createRegion
};
