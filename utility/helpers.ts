import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt from "react-native-jwt-io";
import Realm from "realm";
import { LogBox } from "react-native";
import * as RNLocalize from "react-native-localize";

import i18n from "../i18n";
import config from "../config";
import realmConfig from "../models/index";

const checkForInternet = ( ): Promise<string | null> => (
  new Promise( ( resolve ) => {
    NetInfo.fetch().then( ( { type } ) => {
      resolve( type );
    } ).catch( ( ) => {
      resolve( null );
    } );
  } )
);

const capitalizeNames = ( name: string ): string | undefined => {
  if ( name === null ) {
    return;
  }
  const titleCaseName = name.split( " " )
    .map( ( string ) => string.charAt( 0 ).toUpperCase() + string.substring( 1 ) )
    .join( " " );
  return titleCaseName;
};

const shuffleList = ( list: any[] ): any[] => {
  const newList = list;

  for ( let i = list.length - 1; i > 0; i -= 1 ) {
    const j = Math.floor( Math.random() * ( i + 1 ) );
    [newList[i], newList[j]] = [list[j], list[i]];
  }

  return newList;
};

const HAS_LAUNCHED = "has_launched";

const setAppLaunched = ( ) => {
  AsyncStorage.setItem( HAS_LAUNCHED, "true" );
};

const checkIfFirstLaunch = async ( ): Promise<boolean> => {
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

const checkIfCameraLaunched = async ( ): Promise<boolean> => {
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

const setCardShown = ( ) => {
  AsyncStorage.setItem( CARD_SHOWN, "true" );
};

const checkIfCardShown = async ( ): Promise<boolean> => {
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

export enum StoredRoutes {
  Achievements = "Achievements",
  ChallengeDetails = "ChallengeDetails",
  Home = "Home",
  Match = "Match",
  Observations = "Observations",
  SeekYearInReview = "SeekYearInReview",
  SideMenu = "SideMenu",
}

const setRoute = ( route: StoredRoutes ) => {
  AsyncStorage.setItem( "route", route );
};

const getRoute = async ( ): Promise<StoredRoutes> => {
  try {
    const route = await AsyncStorage.getItem( "route" );
    return route;
  } catch ( error ) {
    return ( error );
  }
};

const fetchNumberSpeciesSeen = ( ): Promise<number> => (
  new Promise( ( resolve ) => {
    Realm.open( realmConfig )
      .then( ( realm ) => {
        const { length } = realm.objects( "TaxonRealm" );
        resolve( length );
      } ).catch( ( ) => {
        resolve( 0 );
      } );
  } )
);

const createJwtToken = ( ): string => {
  const claims = {
    application: "SeekRN",
    exp: new Date().getTime() / 1000 + 300
  };

  const token = jwt.encode( claims, config.jwtSecret, "HS512" );
  return token;
};

const localizeNumber = ( number: number ): string => {
  const { decimalSeparator, groupingSeparator } = RNLocalize.getNumberFormatSettings();
  return i18n.formatNumber( number, {
    precision: 0,
    delimiter: groupingSeparator,
    separator: decimalSeparator
  } );
};

const localizePercentage = ( number: number ): string => i18n.numberToPercentage( number, { precision: 0 } );

const hideLogs = ( ) => {
  LogBox.ignoreLogs( [
    "Picker has been extracted",
    "VirtualizedLists should never be nested"
  ] );
};

export {
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
  hideLogs
};
