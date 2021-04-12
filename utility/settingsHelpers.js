// @flow
import Realm from "realm";
import AsyncStorage from "@react-native-async-storage/async-storage";

import realmConfig from "../models/index";
import { setDeviceLanguageOrFallback } from "./languageHelpers";

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
    // still keeping these stored in async storage
    // but they'll only be used once to set up this realm
    const autoCapture = await getAutoCapture( );
    const localSeasonality = await getSeasonality( );
    const scientificNames = await getScientificNames( );

    realm.write( ( ) => {
      if ( realm.objects( "UserSettingsRealm" ).length > 0 ) {
        // don't overwrite user settings during setup
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
  getScientificNames,
  toggleLanguage,
  getLanguage,
  getAutoCapture,
  getSeasonality,
  setupUserSettings,
  updateUserSetting
};
