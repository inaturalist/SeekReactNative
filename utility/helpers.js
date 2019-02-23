const { FileUpload } = require( "inaturalistjs" );
const Realm = require( "realm" );
const uuid = require( "react-native-uuid" );
const { AsyncStorage } = require( "react-native" );
const inatjs = require( "inaturalistjs" );

const realmConfig = require( "../models/index" );
const { truncateCoordinates, reverseGeocodeLocation } = require( "./locationHelpers" );
const { recalculateBadges } = require( "./badgeHelpers" );
const { recalculateChallenges } = require( "./challengeHelpers" );

const capitalizeNames = ( name ) => {
  const titleCaseName = name.split( " " )
    .map( string => string.charAt( 0 ).toUpperCase() + string.substring( 1 ) )
    .join( " " );
  return titleCaseName;
};

const flattenUploadParameters = ( uri, time, latitude, longitude ) => {
  const params = {
    image: new FileUpload( {
      uri,
      name: "photo.jpeg",
      type: "image/jpeg"
    } ),
    observed_on: new Date( time * 1000 ).toISOString(),
    latitude,
    longitude
  };
  return params;
};

const addToCollection = ( observation, latitude, longitude, image ) => {
  Realm.open( realmConfig.default )
    .then( ( realm ) => {
      realm.write( () => {
        let defaultPhoto;
        const p = observation.taxon.default_photo;
        if ( image ) {
          defaultPhoto = realm.create( "PhotoRealm", {
            squareUrl: p.medium_url,
            mediumUrl: image.uri
          } );
        }
        const taxon = realm.create( "TaxonRealm", {
          id: observation.taxon.id,
          name: capitalizeNames( observation.taxon.name ),
          preferredCommonName: capitalizeNames( observation.taxon.preferred_common_name ),
          iconicTaxonId: observation.taxon.iconic_taxon_id,
          defaultPhoto
        } );
        const species = realm.create( "ObservationRealm", {
          uuidString: uuid.v1(),
          date: new Date(),
          taxon,
          latitude: truncateCoordinates( latitude ),
          longitude: truncateCoordinates( longitude ),
          placeName: reverseGeocodeLocation( latitude, longitude )
        } );
      } );
      // recalculateBadges();
      // recalculateChallenges();
    } ).catch( ( e ) => {
      console.log( "Error adding photos to collection: ", e );
    } );
};

const HAS_LAUNCHED = "has_launched";

const setAppLaunched = () => {
  AsyncStorage.setItem( HAS_LAUNCHED, "true" );
};

const checkIfFirstLaunch = async () => {
  try {
    const hasLaunched = await AsyncStorage.getItem( HAS_LAUNCHED );
    if ( hasLaunched === null ) {
      setAppLaunched();
      return true;
    }
    return false;
  } catch ( error ) {
    return false;
  }
};

const CARD_SHOWN = "card_shown";

const setCardShown = () => {
  AsyncStorage.setItem( CARD_SHOWN, "true" );
};

const checkIfCardShown = async () => {
  try {
    const hasShown = await AsyncStorage.getItem( CARD_SHOWN );
    if ( hasShown === null ) {
      setCardShown();
      return true;
    }
    return false;
  } catch ( error ) {
    return false;
  }
};

const setTotalObservations = ( total ) => {
  AsyncStorage.setItem( "total_observations", total );
};

const setTotalObservers = ( total ) => {
  AsyncStorage.setItem( "total_observers", total );
};

const fetchTotalObservations = () => {
  inatjs.observations.fetch().then( ( response ) => {
    setTotalObservations( response.total_results.toString() );
  } ).catch( ( error ) => {
    // console.log( "can't set observations:", error );
  } );
};

const fetchTotalObservers = () => {
  inatjs.observations.observers().then( ( response ) => {
    setTotalObservers( response.total_results.toString() );
  } ).catch( ( error ) => {
    // console.log( "can't set observers:", error );
  } );
};

const getObservationData = async () => {
  try {
    const observations = await AsyncStorage.getItem( "total_observations" );
    const observers = await AsyncStorage.getItem( "total_observers" );
    return {
      observations: Number( observations ),
      observers: Number( observers )
    };
  } catch ( error ) {
    return ( error );
  }
};

const fetchObservationData = () => {
  fetchTotalObservations();
  fetchTotalObservers();
};

export {
  addToCollection,
  capitalizeNames,
  flattenUploadParameters,
  checkIfFirstLaunch,
  checkIfCardShown,
  fetchObservationData,
  getObservationData
};
