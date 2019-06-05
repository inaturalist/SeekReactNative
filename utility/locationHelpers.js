import AsyncStorage from "@react-native-community/async-storage";
import Geocoder from "react-native-geocoder";

const fetchUserLocation = () => (
  new Promise( ( resolve ) => {
    navigator.geolocation.getCurrentPosition( ( { coords } ) => {
      resolve( coords );
    } ).catch( () => {
      resolve( null );
    } );
  } )
);

const truncateCoordinates = ( coordinate ) => {
  if ( !coordinate ) {
    return null;
  }
  return Number( coordinate.toFixed( 2 ) );
};

const fetchTruncatedUserLocation = () => (
  new Promise( ( resolve ) => {
    navigator.geolocation.getCurrentPosition( ( { coords } ) => {
      const latitude = truncateCoordinates( coords.latitude );
      const longitude = truncateCoordinates( coords.longitude );
      const truncatedCoords = {
        latitude,
        longitude
      };

      resolve( truncatedCoords );
    } ).catch( () => {
      resolve( null );
    } );
  } )
);

const fetchLocationName = ( lat, lng ) => (
  new Promise( ( resolve ) => {
    Geocoder.geocodePosition( { lat, lng } ).then( ( result ) => {
      if ( result.length === 0 ) {
        resolve( null );
      }
      const { locality, subAdminArea } = result[0];
      resolve( locality || subAdminArea );
    } ).catch( () => {
      resolve( null );
    } );
  } )
);

const reverseGeocodeLocation = ( latitude, longitude ) => {
  Geocoder.default.geocodePosition( { lat: latitude, lng: longitude } )
    .then( ( result ) => {
      const { locality, subAdminArea } = result[0];
      return locality || subAdminArea;
    } ).catch( () => {
      // console.log( "Error reverse geocoding location: ", err.message );
    } );
};

const setLatAndLng = ( lat, lng ) => {
  AsyncStorage.setItem( "latitude", lat );
  AsyncStorage.setItem( "longitude", lng );
};

const getLatAndLng = async () => {
  try {
    const latitude = await AsyncStorage.getItem( "latitude" );
    const longitude = await AsyncStorage.getItem( "longitude" );
    return {
      latitude: Number( latitude ),
      longitude: Number( longitude )
    };
  } catch ( error ) {
    return ( error );
  }
};

export {
  reverseGeocodeLocation,
  truncateCoordinates,
  setLatAndLng,
  getLatAndLng,
  fetchUserLocation,
  fetchLocationName,
  fetchTruncatedUserLocation
};
