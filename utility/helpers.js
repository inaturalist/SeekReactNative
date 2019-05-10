import i18n from "../i18n";

const { FileUpload } = require( "inaturalistjs" );
const Realm = require( "realm" );
const uuid = require( "react-native-uuid" );
const { AsyncStorage, Platform } = require( "react-native" );
const RNFS = require( "react-native-fs" );

const realmConfig = require( "../models/index" );
const { truncateCoordinates, reverseGeocodeLocation } = require( "./locationHelpers" );

const capitalizeNames = ( name ) => {
  const titleCaseName = name.split( " " )
    .map( string => string.charAt( 0 ).toUpperCase() + string.substring( 1 ) )
    .join( " " );
  return titleCaseName;
};

const addARCameraFiles = () => {
  if ( Platform.OS === "android" ) {
    RNFS.copyFileAssets( "camera/optimized_model.tflite", `${RNFS.DocumentDirectoryPath}/optimized-model.tflite` )
      .then( ( result ) => {
        // console.log( result, "model in AR camera files" );
      } ).catch( ( error ) => {
        // console.log( error, "err in AR camera files" );
      } );

    RNFS.copyFileAssets( "camera/taxonomy.csv", `${RNFS.DocumentDirectoryPath}/taxonomy.csv` )
      .then( ( result ) => {
        // console.log( result, "taxonomy in AR camera files" );
      } ).catch( ( error ) => {
        // console.log( error, "err in AR camera files" );
      } );
  } else if ( Platform.OS === "ios" ) {
    RNFS.copyFile( `${RNFS.MainBundlePath}/optimized_model.mlmodelc`, `${RNFS.DocumentDirectoryPath}/optimized_model.mlmodelc` )
      .then( ( result ) => {
        // console.log( result, "model in AR camera files" );
      } ).catch( ( error ) => {
        // Alert.alert( error, "err in AR camera files" );
      } );

    RNFS.copyFile( `${RNFS.MainBundlePath}/taxonomy.json`, `${RNFS.DocumentDirectoryPath}/taxonomy.json` )
      .then( ( result ) => {
        // console.log( result, "model in AR camera files" );
      } ).catch( ( error ) => {
        // console.log( error, "err in AR camera files" );
      } );
  }
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
        const { taxon } = observation;
        const p = taxon.default_photo;
        if ( image ) {
          defaultPhoto = realm.create( "PhotoRealm", {
            squareUrl: p.medium_url,
            mediumUrl: image.uri
          } );
        }
        const newTaxon = realm.create( "TaxonRealm", {
          id: taxon.id,
          name: taxon.name,
          preferredCommonName: taxon.preferred_common_name
            ? capitalizeNames( taxon.preferred_common_name )
            : null,
          iconicTaxonId: taxon.iconic_taxon_id,
          ancestorIds: taxon.ancestorIds,
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
    } ).catch( ( e ) => {
      console.log( e, "error adding to collection" );
    } );
};

const shuffleList = ( list ) => {
  const newList = list;

  for ( let i = list.length - 1; i > 0; i -= 1 ) {
    const j = Math.floor( Math.random() * ( i + 1 ) );
    [newList[i], newList[j]] = [list[j], list[i]];
  }

  return newList;
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

const getTaxonCommonName = taxonID => (
  new Promise( ( resolve ) => {
    Realm.open( realmConfig.default )
      .then( ( realm ) => {
        const searchLocale = i18n.currentLocale( ).split( "-" )[0].toLowerCase( );
        // look up common names for predicted taxon in the current locale
        const commonNames = realm.objects( "CommonNamesRealm" )
          .filtered( `taxon_id == ${taxonID} and locale == '${searchLocale}'` );
        resolve( commonNames.length > 0 ? capitalizeNames( commonNames[0].name ) : null );
      } ).catch( ( err ) => {
        console.log( "[DEBUG] Failed to open realm, error: ", err );
        resolve( );
      } );
  } )
);

const setSpeciesId = ( id ) => {
  AsyncStorage.setItem( "id", id.toString() );
};

const getSpeciesId = async () => {
  try {
    const id = await AsyncStorage.getItem( "id" );
    return Number( id );
  } catch ( error ) {
    return ( error );
  }
};

const setRoute = ( route ) => {
  AsyncStorage.setItem( "route", route );
};

const getRoute = async () => {
  try {
    const route = await AsyncStorage.getItem( "route" );
    return route;
  } catch ( error ) {
    return ( error );
  }
};

export {
  addARCameraFiles,
  addToCollection,
  capitalizeNames,
  flattenUploadParameters,
  getTaxonCommonName,
  checkIfFirstLaunch,
  checkIfCardShown,
  shuffleList,
  setSpeciesId,
  getSpeciesId,
  setRoute,
  getRoute
};
