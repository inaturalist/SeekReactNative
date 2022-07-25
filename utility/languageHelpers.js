// @flow

import * as RNLocalize from "react-native-localize";
import { I18nManager, Platform } from "react-native";
import RNRestart from "react-native-restart";

import languages from "./dictionaries/languageDict";
import i18n from "../i18n";
import { setupCommonNames } from "./commonNamesHelpers";

const deviceLanguageSupported = ( ): boolean => {
  const { languageCode } = RNLocalize.getLocales()[0];
  return Object.keys( languages ).includes( languageCode );
};

const setDeviceLanguageOrFallback = ( ): string => {
  return deviceLanguageSupported( ) ? "device" : "en";
};

const setLanguageCodeOrFallback = ( ): string => {
  // this is the hyphenated version
  const { languageCode } = RNLocalize.getLocales()[0];
  return deviceLanguageSupported( ) ? languageCode : "en";
};

const localeNoHyphens = ( locale: string ): string => {
  if ( locale === "pt-BR" ) {
    return locale.replace( "-","" );
  } else {
    return locale.split( "-" )[0];
  }
};

const checkRTLSettings = async ( ) => {
  // Android takes care of this automatically
  if ( Platform.OS === "android" ) { return; }

  const { isRTL, forceRTL } = I18nManager;
  const locale = localeNoHyphens( i18n.locale );

  try {
    // we might want to switch to simply storing this in Context, eventually
    // https://stackoverflow.com/questions/62768878/react-native-app-ltr-to-rtl-change-without-restarting-the-app
    if ( ( locale === "he" || locale === "ar" ) && !isRTL ) {
      await forceRTL( true );
      // this seems more necessary for RTL languages,
      // as a way to not need to restart the device before the language
      // will switch
      RNRestart.Restart( );
    } else if ( isRTL ) {
      await forceRTL( false );
    }
  } catch ( e ) {
    console.log( "couldn't switch RTL settings:", e );
  }
};

const handleLocalizationChange = () => {
  const fallback = { languageTag: "en" };
  const { languageTag } = RNLocalize.getLocales()[0] || fallback;

  i18n.locale = languageTag;
  checkRTLSettings( );
};

const loadUserLanguagePreference = ( preferredLanguage: string ) => {
  setTimeout( () => setupCommonNames( preferredLanguage ), 5000 );
  // do not wait for commonNames setup to complete. It could take a while to
  // add all names to Realm and we don't want to hold up the UI as names
  // are not needed immediately
  if ( preferredLanguage !== "device" ) {
    i18n.locale = preferredLanguage;
    checkRTLSettings( );
  } else {
    handleLocalizationChange();
  }
};

const setDisplayLanguage = ( preferredLanguage: string ): string => {
  if ( preferredLanguage === "device" ) {
    return setLanguageCodeOrFallback( );
  }
  return preferredLanguage;
};

export {
  setDeviceLanguageOrFallback,
  setLanguageCodeOrFallback,
  handleLocalizationChange,
  loadUserLanguagePreference,
  setDisplayLanguage,
  deviceLanguageSupported,
  localeNoHyphens
};
