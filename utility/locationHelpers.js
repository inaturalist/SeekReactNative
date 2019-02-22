const Geocoder = require( "react-native-geocoder" );
const { AsyncStorage } = require( "react-native" );

const truncateCoordinates = coordinate => Number( coordinate.toFixed( 2 ) );

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
  getLatAndLng
};
