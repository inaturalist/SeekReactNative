import AsyncStorage from "@react-native-community/async-storage";

const Geocoder = require( "react-native-geocoder" );

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
  fetchUserLocation
};
