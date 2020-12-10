import * as RNLocalize from "react-native-localize";
import { I18nManager, Platform } from "react-native";

import languages from "./dictionaries/languageDict";
import i18n from "../i18n";
import { setupCommonNames } from "./commonNamesHelpers";

const setDeviceLanguageOrFallback = ( ) => {
  const { languageCode } = RNLocalize.getLocales()[0];
  const deviceLanguageSupported = Object.keys( languages ).includes( languageCode );

  return deviceLanguageSupported ? "device" : "en";
};

const setLanguageCodeOrFallback = ( ) => {
  const { languageCode } = RNLocalize.getLocales()[0];
  const deviceLanguageSupported = Object.keys( languages ).includes( languageCode );

  return deviceLanguageSupported ? languageCode : "en";
};

const setRTL = ( locale ) => {
  // Android takes care of this automatically
  if ( Platform.OS === "android" ) { return; }

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
  setRTL( languageTag );
};

const setSeekAndCommonNamesLanguage = ( preferredLanguage ) => {
  // do not wait for commonNames setup to complete. It could take a while to
  // add all names to Realm and we don't want to hold up the UI as names
  // are not needed immediately
  if ( preferredLanguage !== "device" ) {
    i18n.locale = preferredLanguage;
    setRTL( preferredLanguage );
    setTimeout( () => setupCommonNames( preferredLanguage ), 5000 );
  } else {
    handleLocalizationChange();
    setTimeout( () => setupCommonNames( preferredLanguage ), 5000 );
  }
};

export {
  setDeviceLanguageOrFallback,
  setLanguageCodeOrFallback,
  setRTL,
  handleLocalizationChange,
  setSeekAndCommonNamesLanguage
};
