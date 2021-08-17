// @flow

import { Alert, Platform } from "react-native";
import Geocoder from "react-native-geocoder";
import OpenSettings from "react-native-open-settings";
import Geolocation from "react-native-geolocation-service";

import i18n from "../i18n";

const requestiOSPermissions = async ( ) => {
  if ( Platform.OS === "ios" ) {
    const permission = await Geolocation.requestAuthorization( "whenInUse" );
    return permission;
  }
};

type TruncatedCoords = {
  latitude: number,
  longitude: number
}

type Coords = {
  latitude: number,
  longitude: number,
  accuracy: number
}

const fetchUserLocation = ( enableHighAccuracy: ?boolean = false ): Promise<Coords> => (
  new Promise( ( resolve, reject ) => {
    Geolocation.getCurrentPosition( ( { coords } ) => {
      const { latitude, longitude, accuracy } = coords;
      resolve( {
        latitude,
        longitude,
        accuracy
      } );
    }, ( { code } ) => {
      reject( code );
    }, {
      // enableHighAccuracy to use GPS instead of Wifi location (i.e. cell towers )
      // on error (particular Android devices), try again with enableHighAccuracy = false
      enableHighAccuracy,
      showLocationDialog: false,
      maximumAge: 20000,
      // added timeout and removed requestiOSPermissions for precise locations
      // since this sometimes wasn't resolving or rejecting
      timeout: 30000
    } );
  } )
);

const truncateCoordinates = ( coordinate: number ): number => Number( coordinate.toFixed( 2 ) );

const fetchTruncatedUserLocation = ( ): Promise<TruncatedCoords> => (
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
    }, {
      timeout: 30000,
      showLocationDialog: false,
      maximumAge: 5000
    } );
  } )
);

const setPlaceName = ( results: Array<Object> ) => {
  let placeName = null;

  const { locality, subAdminArea, adminArea, country, feature } = results[0];

  // we could get as specific as sublocality here, but a lot of the results are
  // too specific to be helpful in the U.S. at least. neighborhoods, parks, etc.
  if ( locality ) {
    placeName = locality;
  } else if ( subAdminArea ) {
    placeName = subAdminArea;
  } else if ( adminArea ) {
    placeName = adminArea;
  } else if ( country ) {
    placeName = country;
  } else if ( feature ) {
    // this one shows non-land areas like Channels, Seas, Oceans
    placeName = feature;
  }
  return placeName;
};

const fetchLocationName = ( lat: ?number, lng: ?number ): Promise<?string> => (
  new Promise( ( resolve, reject ) => {
    Geocoder.geocodePosition( { lat, lng } ).then( ( results ) => {
      if ( results.length === 0 ) {
        resolve( null );
      }

      const placeName = setPlaceName( results );
      resolve( placeName );
    } ).catch( ( e ) => {
      reject( e );
    } );
  } )
);

const fetchCoordsByLocationName = async ( location: string ): Promise<{
  placeName: ?string,
  position: {
    lat: ?number,
    lng: ?number
  }
}> => {
  const emptyResults = {
    placeName: null,
    position: {
      lat: null,
      lng: null
    }
  };

  try {
    const results = await Geocoder.geocodeAddress( location );

    if ( results.length === 0 ) { return emptyResults; }

    const placeName = setPlaceName( results );
    const { position } = results[0];

    return {
      placeName,
      position
    };
  } catch ( e ) {
    console.log( e, "couldn't fetch coords by location name" );
    return emptyResults;
  }
};

const createLocationAlert = ( errorCode: number ) => {
  let body;
  const button = [{ text: i18n.t( "posting.ok" ), style: "default" }];

  if ( errorCode === 1 ) {
    body = i18n.t( "results.error_location" );
    if ( Platform.OS === "android" ) {
      button.unshift( {
        text: i18n.t( "results.enable_location_button" ),
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

const checkForTruncatedCoordinates = ( latitude: number ): boolean => {
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

const createRegion = ( region: { latitude: number, longitude: number } ): Object => {
  const latitudeDelta = 0.2;
  const longitudeDelta = 0.2;

  return {
    latitude: region.latitude,
    longitude: region.longitude,
    latitudeDelta,
    longitudeDelta
  };
};

const createAlertUserLocationOnMaps = ( errorCode: number ) => {
  let body;
  const button = [{ text: i18n.t( "posting.ok" ), style: "default" }];

  if ( errorCode === 1 ) {
    body = i18n.t( "species_nearby.no_location" );
    if ( Platform.OS === "android" ) {
      button.unshift( {
        text: i18n.t( "species_nearby.enable_location" ),
        onPress: () => OpenSettings.openSettings()
      } );
    }
  } else if ( errorCode === 2 ) {
    body = i18n.t( "species_nearby.no_gps" );
  } else if ( errorCode === 5 ) {
    body = i18n.t( "species_nearby.error_alert_location_services" );
  } else {
    body = i18n.t( "species_nearby.location_timeout" );
  }

  Alert.alert( null, body, button );
};

export {
  truncateCoordinates,
  fetchUserLocation,
  fetchLocationName,
  fetchTruncatedUserLocation,
  createLocationAlert,
  checkForTruncatedCoordinates,
  createRegion,
  createAlertUserLocationOnMaps,
  fetchCoordsByLocationName
};
