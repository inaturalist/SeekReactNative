// @flow
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import jwt from "react-native-jwt-io";
import { FileUpload } from "inaturalistjs";
import Realm from "realm";
import { Platform } from "react-native";
import RNFS from "react-native-fs";
import * as RNLocalize from "react-native-localize";
import { resizeImage } from "./photoHelpers";

import i18n from "../i18n";
import iconicTaxaIds from "./dictionaries/iconicTaxonDictById";
import config from "../config";
import realmConfig from "../models/index";
import {
  dirModel,
  dirTaxonomy
} from "./dirStorage";
import { dimensions } from "../styles/global";

const checkForInternet = () => (
  new Promise( ( resolve ) => {
    NetInfo.fetch().then( ( { type } ) => {
      resolve( type );
    } ).catch( () => {
      resolve( null );
    } );
  } )
);

const capitalizeNames = ( name ) => {
  if ( name === null ) {
    return;
  }
  const titleCaseName = name.split( " " )
    .map( ( string ) => string.charAt( 0 ).toUpperCase() + string.substring( 1 ) )
    .join( " " );
  return titleCaseName;
};

const addARCameraFiles = async () => {
  if ( Platform.OS === "android" ) {
    RNFS.copyFileAssets( "camera/optimized_model.tflite", dirModel )
      .then( ( result ) => {
        console.log( result, "model in AR camera files", dirModel );
      } ).catch( ( error ) => {
        console.log( error, "err in AR camera files" );
      } );

    RNFS.copyFileAssets( "camera/taxonomy.csv", dirTaxonomy )
      .then( ( result ) => {
        console.log( result, "taxonomy in AR camera files" );
      } ).catch( ( error ) => {
        console.log( error, "err in AR camera files" );
      } );
  } else if ( Platform.OS === "ios" ) {
    RNFS.copyFile( `${RNFS.MainBundlePath}/optimized_model.mlmodelc`, dirModel )
      .then( ( result ) => {
        console.log( result, "model in AR camera files" );
      } ).catch( ( error ) => {
        console.log( error, "err in AR camera files" );
      } );

    RNFS.copyFile( `${RNFS.MainBundlePath}/taxonomy.json`, dirTaxonomy )
      .then( ( result ) => {
        console.log( result, "model in AR camera files" );
      } ).catch( ( error ) => {
        console.log( error, "err in AR camera files" );
      } );
  }
};

const resizePhoto = async ( uri ) => {
  try {
    const image = await resizeImage( uri, 299 );
    return image;
  } catch ( e ) {
    return null;
  }
};

const flattenUploadParameters = async ( image ) => {
  const {
    latitude,
    longitude,
    uri,
    time
  } = image;
  const userImage = await resizePhoto( uri );

  const params = {
    image: new FileUpload( {
      uri: userImage,
      name: "photo.jpeg",
      type: "image/jpeg"
    } ),
    observed_on: new Date( time * 1000 ).toISOString(),
    latitude,
    longitude
  };
  return params;
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

const CAMERA_LAUNCHED = "camera_launched";

const setCameraLaunched = ( boolean ) => {
  AsyncStorage.setItem( CAMERA_LAUNCHED, boolean.toString() );
};

const checkIfCameraLaunched = async () => {
  try {
    const cameraLaunched = await AsyncStorage.getItem( CAMERA_LAUNCHED );
    if ( cameraLaunched === null || cameraLaunched === "false" ) {
      setCameraLaunched( true );
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

const getTaxonCommonName = ( taxonID ) => (
  new Promise( ( resolve ) => {
    Realm.open( realmConfig )
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

const checkForIconicTaxonId = ( ancestorIds ) => {
  const taxaIdList = Object.keys( iconicTaxaIds ).reverse();
  taxaIdList.pop();
  taxaIdList.push( 47686, 48222 ); // checking for protozoans and kelp

  const newTaxaList = [];

  taxaIdList.forEach( ( id ) => {
    newTaxaList.push( Number( id ) );
  } );

  const iconicTaxonId = newTaxaList.filter( ( value ) => ancestorIds.indexOf( value ) !== -1 );

  return iconicTaxonId[0] || 1;
};

const fetchNumberSpeciesSeen = () => (
  new Promise( ( resolve ) => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const { length } = realm.objects( "TaxonRealm" );
        resolve( length );
      } ).catch( () => {
        resolve( 0 );
      } );
  } )
);

const createJwtToken = () => {
  const claims = {
    application: "SeekRN",
    exp: new Date().getTime() / 1000 + 300
  };

  const token = jwt.encode( claims, config.jwtSecret, "HS512" );
  return token;
};

const localizeNumber = ( number ) => {
  const { decimalSeparator, groupingSeparator } = RNLocalize.getNumberFormatSettings();
  return i18n.toNumber( number, {
    precision: 0,
    delimiter: groupingSeparator,
    separator: decimalSeparator
  } );
};

const localizePercentage = ( number ) => i18n.toPercentage( number, { precision: 0 } );

const requiresSafeArea = () => Platform.OS === "ios" && dimensions.height > 570;

const navigateToMainStack = ( navigate, screen, params ) => {
  navigate( "Drawer", { screen: "Main", params: { screen, params } } );
};

export {
  addARCameraFiles,
  capitalizeNames,
  flattenUploadParameters,
  getTaxonCommonName,
  checkIfFirstLaunch,
  checkIfCardShown,
  checkIfCameraLaunched,
  shuffleList,
  setSpeciesId,
  setCameraLaunched,
  getSpeciesId,
  setRoute,
  getRoute,
  checkForInternet,
  checkForIconicTaxonId,
  fetchNumberSpeciesSeen,
  createJwtToken,
  localizeNumber,
  localizePercentage,
  requiresSafeArea,
  navigateToMainStack
};
