import * as RNLocalize from "react-native-localize";
import { I18nManager, Platform } from "react-native";

import languages from "./dictionaries/languageDict";
import i18n from "../i18n";
import { setupCommonNames } from "./commonNamesHelpers";

const deviceLanguageSupported = ( ) => {
  const { languageCode } = RNLocalize.getLocales()[0];
  return Object.keys( languages ).includes( languageCode );
};

const setDeviceLanguageOrFallback = ( ) => {
  return deviceLanguageSupported( ) ? "device" : "en";
};

const setLanguageCodeOrFallback = ( ) => {
  // this is the hyphenated version
  const { languageCode } = RNLocalize.getLocales()[0];
  return deviceLanguageSupported( ) ? languageCode : "en";
};

const localeNoHyphens = ( locale: string ) => {
  if ( locale === "pt-BR" ) {
    return locale.replace( "-","" );
  } else {
    return locale.split( "-" )[0];
  }
};

const setRTL = ( ) => {
  // Android takes care of this automatically
  if ( Platform.OS === "android" ) { return; }

  const locale = localeNoHyphens( i18n.locale );

  if ( locale === "he" || locale === "ar" ) {
    I18nManager.forceRTL( true );
  } else {
    I18nManager.forceRTL( false );
  }
};

const handleLocalizationChange = () => {
  const fallback = { languageTag: "en" };
  const { languageTag } = RNLocalize.getLocales()[0] || fallback;

  i18n.locale = languageTag;
  setRTL( );
};

const loadUserLanguagePreference = ( preferredLanguage: string ) => {
  setTimeout( () => setupCommonNames( preferredLanguage ), 5000 );
  // do not wait for commonNames setup to complete. It could take a while to
  // add all names to Realm and we don't want to hold up the UI as names
  // are not needed immediately
  if ( preferredLanguage !== "device" ) {
    i18n.locale = preferredLanguage;
    setRTL( );
  } else {
    handleLocalizationChange();
  }
};

const setDisplayLanguage = ( preferredLanguage: string ) => {
  if ( preferredLanguage === "device" ) {
    return setLanguageCodeOrFallback( );
  }
  return preferredLanguage;
};

export {
  setDeviceLanguageOrFallback,
  setLanguageCodeOrFallback,
  setRTL,
  handleLocalizationChange,
  loadUserLanguagePreference,
  setDisplayLanguage,
  deviceLanguageSupported,
  localeNoHyphens
};
