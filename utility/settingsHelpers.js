// @flow
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setDeviceLanguageOrFallback } from "./languageHelpers";

const toggleScientificNames = ( boolean: boolean ) => {
  AsyncStorage.setItem( "scientific_names", boolean.toString() );
};

const getScientificNames = async () => {
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

const getLanguage = async () => {
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

const getAutoCapture = async () => {
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

const toggleSeasonality = ( boolean: boolean ) => {
  AsyncStorage.setItem( "seasonality", boolean.toString() );
};

const getSeasonality = async () => {
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

export {
  toggleScientificNames,
  getScientificNames,
  toggleLanguage,
  getLanguage,
  toggleCameraCapture,
  getAutoCapture,
  toggleSeasonality,
  getSeasonality
};
