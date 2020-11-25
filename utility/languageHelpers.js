import * as RNLocalize from "react-native-localize";
import languages from "./dictionaries/languageDict";

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

export {
  setDeviceLanguageOrFallback,
  setLanguageCodeOrFallback
};
