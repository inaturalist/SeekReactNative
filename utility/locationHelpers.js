import { Alert, PermissionsAndroid } from "react-native";
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

const checkLocationPermissions = async () => {
  const location = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;

  try {
    const granted = await PermissionsAndroid.request( location );
    if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
      return true;
    }
    return false;
  } catch ( err ) {
    return err;
  }
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
      // Alert.alert( JSON.stringify( result ), "location name" );
      if ( result.length === 0 ) {
        resolve( null );
      }
      const { locality, subAdminArea } = result[0];
      resolve( locality || subAdminArea );
    } ).catch( ( e ) => {
      // Alert.alert( JSON.stringify( e ), "location name error" );
      reject( e );
    } );
  } )
);

const createLocationPermissionsAlert = () => {
  Alert.alert(
    i18n.t( "results.enable_location" ),
    i18n.t( "results.error_location" ),
    [{
      text: i18n.t( "species_nearby.enable_location" ),
      onPress: () => OpenSettings.openSettings()
    },
    {
      text: i18n.t( "posting.ok" ),
      style: "default"
    }]
  );
};

const createGPSAlert = () => {
  Alert.alert(
    i18n.t( "species_nearby.no_gps" ),
    i18n.t( "results.error_gps" ),
    [{
      text: i18n.t( "posting.ok" ),
      style: "default"
    }]
  );
};

const createLocationTimeoutAlert = () => {
  Alert.alert(
    i18n.t( "species_nearby.location_timeout" ),
    i18n.t( "results.error_timeout" ),
    [{
      text: i18n.t( "posting.ok" ),
      style: "default"
    }]
  );
};

export {
  truncateCoordinates,
  fetchUserLocation,
  fetchLocationName,
  fetchTruncatedUserLocation,
  createLocationPermissionsAlert,
  checkLocationPermissions,
  createGPSAlert,
  createLocationTimeoutAlert
};
