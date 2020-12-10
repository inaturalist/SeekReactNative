// @flow
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-community/async-storage";
import jwt from "react-native-jwt-io";
import Realm from "realm";
import { Platform, LogBox } from "react-native";
import RNFS from "react-native-fs";
import * as RNLocalize from "react-native-localize";
import QuickActions from "react-native-quick-actions";

import i18n from "../i18n";
import iconicTaxaIds from "./dictionaries/iconicTaxonDictById";
import config from "../config";
import realmConfig from "../models/index";
import { dirModel, dirTaxonomy } from "./dirStorage";
import { dimensions } from "../styles/global";

const checkForInternet = () => (
  new Promise<any>( ( resolve ) => {
    NetInfo.fetch().then( ( { type } ) => {
      resolve( type );
    } ).catch( () => {
      resolve( null );
    } );
  } )
);

const capitalizeNames = ( name: string ) => {
  if ( name === null ) {
    return;
  }
  const titleCaseName = name.split( " " )
    .map( ( string ) => string.charAt( 0 ).toUpperCase() + string.substring( 1 ) )
    .join( " " );
  return titleCaseName;
};

const addCameraFilesAndroid = () => {
  const copyFilesAndroid = ( source, destination ) => {
    RNFS.copyFileAssets( source, destination ).then( ( result ) => {
      console.log( `moved file from ${source} to ${destination}` );
    } ).catch( ( error ) => {
      console.log( error, `error moving file from ${source} to ${destination}` );
    } );
  };

  RNFS.readDirAssets( "camera" ).then( ( results ) => {
    const model = "optimized_model.tflite";
    const taxonomy = "taxonomy.csv";
    const sampleModel = "small_inception_tf1.tflite";
    const sampleTaxonomy = "small_export_tax.csv";

    const hasModel = results.find( r => r.name === model );
    const hasSampleModel = results.find( r => r.name === sampleModel );

    // Android writes over existing files
    if ( hasModel !== undefined ) {
      copyFilesAndroid( `camera/${model}`, dirModel );
      copyFilesAndroid( `camera/${taxonomy}`, dirTaxonomy );
    } else if ( hasSampleModel !== undefined ) {
      copyFilesAndroid( `camera/${sampleModel}`, dirModel );
      copyFilesAndroid( `camera/${sampleTaxonomy}`, dirTaxonomy );
    }
  } );
};

const addCameraFilesiOS = () => {
  const copyFilesiOS = ( source, destination ) => {
    RNFS.copyFile( source, destination ).then( ( result ) => {
      console.log( `moved file from ${source} to ${destination}` );
    } ).catch( ( error ) => {
      console.log( error, `error moving file from ${source} to ${destination}` );
    } );
  };

  // external devs should swap sample model and taxonomy file
  RNFS.readDir( RNFS.MainBundlePath ).then( ( results ) => {
    const model = "optimized_model.mlmodelc";
    const taxonomy = "taxonomy.json";
    // const sampleModel = "small_inception_tf1.mlmodelc";
    // const sampleTaxonomy = "small_export_tax.json";

    copyFilesiOS( `${RNFS.MainBundlePath}/${model}`, dirModel );
    copyFilesiOS( `${RNFS.MainBundlePath}/${taxonomy}`, dirTaxonomy );
  } );
};

const addARCameraFiles = async () => {
  // RNFS overwrites whatever files existed before
  if ( Platform.OS === "android" ) {
    addCameraFilesAndroid();
  } else if ( Platform.OS === "ios" ) {
    addCameraFilesiOS();
  }
};

const shuffleList = ( list: Array<Object> ) => {
  const newList = list;

  for ( let i = list.length - 1; i > 0; i -= 1 ) {
    const j = Math.floor( Math.random() * ( i + 1 ) );
    // $FlowFixMe
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

const setCameraLaunched = ( boolean: boolean ) => {
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

const setSpeciesId = ( id: number ) => {
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

const setRoute = ( route: string ) => {
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

const checkForIconicTaxonId = ( ancestorIds: Array<number> ) => {
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
  new Promise<any>( ( resolve ) => {
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

const localizeNumber = ( number: number ) => {
  const { decimalSeparator, groupingSeparator } = RNLocalize.getNumberFormatSettings();
  return i18n.toNumber( number, {
    precision: 0,
    delimiter: groupingSeparator,
    separator: decimalSeparator
  } );
};

const localizePercentage = ( number: number ) => i18n.toPercentage( number, { precision: 0 } );

const requiresSafeArea = () => Platform.OS === "ios" && dimensions.height > 570;

const navigateToMainStack = ( navigate: Function, screen: string, params: Object ) => {
  navigate( "Drawer", { screen: "Main", params: { screen, params } } );
};

const hideLogs = () => {
  LogBox.ignoreLogs( [
    "Picker has been extracted",
    "Failed prop type: Invalid prop `confidenceThreshold`",
    "Failed prop type: Invalid prop `taxaDetectionInterval`"
  ] );
};

const setQuickActions = () => {
  if ( Platform.OS === "android" ) {
    QuickActions.setShortcutItems( [
      {
        type: "Seek AR Camera", // Required
        title: "Seek AR Camera", // Optional, if empty, `type` will be used instead
        subtitle: "For quick identifications",
        icon: "camerabutton", // Icons instructions below
        userInfo: {
          url: "app://Drawer/Main/Camera" // Provide any custom data like deep linking URL
        }
      }
    ] );
  }
};

export {
  addARCameraFiles,
  capitalizeNames,
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
  navigateToMainStack,
  hideLogs,
  setQuickActions
};
