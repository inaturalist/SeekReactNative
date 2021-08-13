// @flow
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt from "react-native-jwt-io";
import Realm from "realm";
import { Platform, LogBox } from "react-native";
import RNFS from "react-native-fs";
import * as RNLocalize from "react-native-localize";

import i18n from "../i18n";
import config from "../config";
import realmConfig from "../models/index";
import { dirModel, dirTaxonomy } from "./dirStorage";
import { serverBackOnlineTime } from "./dateHelpers";

const checkForInternet = (): Promise<?string> => (
  new Promise( ( resolve ) => {
    NetInfo.fetch().then( ( { type } ) => {
      resolve( type );
    } ).catch( () => {
      resolve( null );
    } );
  } )
);

const capitalizeNames = ( name: string ): ?string => {
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

const shuffleList = ( list: Array<Object> ): Array<Object> => {
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

const checkIfFirstLaunch = async (): Promise<boolean> => {
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

const checkIfCameraLaunched = async (): Promise<boolean> => {
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

const checkIfCardShown = async (): Promise<boolean> => {
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

const setRoute = ( route: string ) => {
  AsyncStorage.setItem( "route", route );
};

const getRoute = async (): Promise<string> => {
  try {
    const route = await AsyncStorage.getItem( "route" );
    return route;
  } catch ( error ) {
    return ( error );
  }
};

const fetchNumberSpeciesSeen = (): Promise<number> => (
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

const createJwtToken = (): string => {
  const claims = {
    application: "SeekRN",
    exp: new Date().getTime() / 1000 + 300
  };

  const token = jwt.encode( claims, config.jwtSecret, "HS512" );
  return token;
};

const localizeNumber = ( number: number ): string => {
  const { decimalSeparator, groupingSeparator } = RNLocalize.getNumberFormatSettings();
  return i18n.toNumber( number, {
    precision: 0,
    delimiter: groupingSeparator,
    separator: decimalSeparator
  } );
};

const localizePercentage = ( number: number ): string => i18n.toPercentage( number, { precision: 0 } );

const hideLogs = () => {
  LogBox.ignoreLogs( [
    "Picker has been extracted",
    "Failed prop type: Invalid prop `confidenceThreshold`",
    "Failed prop type: Invalid prop `taxaDetectionInterval`",
    "VirtualizedLists should never be nested"
  ] );
};

const handleServerError = ( error: {
  response: {
    status: number,
    headers: {
      map: {
        "retry-after": string
      }
    }
  }
} ): any => {
  const { response } = error;

  if ( !response ) { return null; }

  if ( response.status && response.status === 503 ) {
    const gmtTime = response.headers.map["retry-after"];
    const hours = serverBackOnlineTime( gmtTime );
    return hours;
  }
  return i18n.t( "post_to_inat_card.error_downtime_a_few_hours" );
};

export {
  addARCameraFiles,
  capitalizeNames,
  checkIfFirstLaunch,
  checkIfCardShown,
  checkIfCameraLaunched,
  shuffleList,
  setCameraLaunched,
  setRoute,
  getRoute,
  checkForInternet,
  fetchNumberSpeciesSeen,
  createJwtToken,
  localizeNumber,
  localizePercentage,
  hideLogs,
  handleServerError
};
