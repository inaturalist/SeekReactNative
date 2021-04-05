// @flow
import Realm from "realm";
import AsyncStorage from "@react-native-async-storage/async-storage";

import realmConfig from "../models/index";
import { setDeviceLanguageOrFallback } from "./languageHelpers";

const toggleScientificNames = ( boolean: boolean ) => {
  AsyncStorage.setItem( "scientific_names", boolean.toString() );
};

const getScientificNames = async ( ): Promise<boolean> => {
  try {
    const scientificNames = await AsyncStorage.getItem( "scientific_names" );
    if ( scientificNames === null || scientificNames === "false" ) {
      return false;
    }
    return true;
  } catch ( error ) {
    return false;
  }
};

const toggleLanguage = ( language: string ) => {
  AsyncStorage.setItem( "language", language );
};

const getLanguage = async ( ): Promise<any> => {
  try {
    const language = await AsyncStorage.getItem( "language" );
    return language || setDeviceLanguageOrFallback( );
  } catch ( error ) {
    return false;
  }
};

const toggleCameraCapture = ( boolean: boolean ) => {
  AsyncStorage.setItem( "camera", boolean.toString() );
};

const getAutoCapture = async ( ): Promise<boolean> => {
  try {
    const camera = await AsyncStorage.getItem( "camera" );
    if ( camera === null || camera === "false" ) {
      return false;
    }
    return true;
  } catch ( error ) {
    return false;
  }
};

// const toggleSeasonality = ( boolean: boolean ) => {
//   AsyncStorage.setItem( "seasonality", boolean.toString() );
// };

const getSeasonality = async ( ): Promise<boolean> => {
  try {
    const seasonality = await AsyncStorage.getItem( "seasonality" );
    if ( seasonality === null || seasonality === "false" ) {
      return false;
    }
    return true;
  } catch ( error ) {
    return false;
  }
};

const setupUserSettings = async ( ) => {
  const realm = await Realm.open( realmConfig );

  try {
    const autoCapture = await getAutoCapture( );
    const localSeasonality = await getSeasonality( );
    const scientificNames = await getScientificNames( );
    console.log( autoCapture, localSeasonality, scientificNames, "user-settings" );

    realm.write( ( ) => {
      if ( realm.objects( "UserSettingsRealm" ).length > 0 ) {
        return;
      }
      realm.create( "UserSettingsRealm", {
        autoCapture,
        localSeasonality,
        scientificNames
      }, true );
    } );
  } catch ( e ) {
    console.log( e, "couldn't set up User Settings Realm" );
  }
};

const updateUserSetting = async ( key: string, value: boolean ): Promise<?boolean> => {
  const realm = await Realm.open( realmConfig );
  const userSettings = realm.objects( "UserSettingsRealm" );

  try {
    realm.write( ( ) => {
      userSettings[0][key] = value;
    } );
    return value;
  } catch ( e ) {
    console.log( e, "couldn't update User Settings Realm" );
  }
};

export {
  toggleScientificNames,
  getScientificNames,
  toggleLanguage,
  getLanguage,
  toggleCameraCapture,
  getAutoCapture,
  // toggleSeasonality,
  getSeasonality,
  setupUserSettings,
  updateUserSetting
};
