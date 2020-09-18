import React, { useContext, useCallback, useMemo } from "react";
import { Text, View } from "react-native";
import Checkbox from "react-native-check-box";
import * as RNLocalize from "react-native-localize";

import i18n from "../../i18n";
import styles from "../../styles/settings";
import { colors } from "../../styles/global";
import Picker from "../UIComponents/Picker";
import languages from "../../utility/dictionaries/languageDict";
import { LanguageContext } from "../UserContext";
import { toggleLanguage } from "../../utility/settingsHelpers";

const localeList = Object.keys( languages ).map( ( locale ) => (
  { value: locale, label: languages[locale] }
) );

const LanguagePicker = () => {
  const { toggleLanguagePreference, preferredLanguage } = useContext( LanguageContext );
  const { languageTag } = RNLocalize.getLocales()[0];
  const deviceLanguage = languageTag.split( "-" )[0].toLowerCase();
  const deviceLanguageSupported = Object.keys( languages ).includes( deviceLanguage );

  const chooseDisplayLanguage = () => {
    if ( preferredLanguage === "device" ) {
      return deviceLanguageSupported ? deviceLanguage : "en";
    }
    return preferredLanguage;
  };

  const displayLanguage = chooseDisplayLanguage();
  const isChecked = preferredLanguage === "device" || displayLanguage === deviceLanguage;

  const handleValueChange = useCallback( ( value ) => {
    // this prevents the double render on new Android install
    // without this, the user changes the language
    // and handleValueChange is immediately called with "en"
    if ( value === displayLanguage && preferredLanguage === "device" ) {
      return;
    }

    // only update state if new language is desired
    if ( value === preferredLanguage ) {
      return;
    }

    // this changes translations on Settings screen in real-time
    i18n.locale = value;

    toggleLanguage( value );
    toggleLanguagePreference();
  }, [displayLanguage, preferredLanguage, toggleLanguagePreference] );

  const renderLanguagePicker = useMemo( () => (
    <View style={[styles.marginGreenButton, styles.center]}>
      <View style={styles.greenButton}>
        <Text style={styles.languageText}>
          {displayLanguage && languages[displayLanguage].toLocaleUpperCase()}
        </Text>
      </View>
    </View>
  ), [displayLanguage] );

  const setDeviceLanguage = useCallback( () => handleValueChange( "device" ), [handleValueChange] );

  return (
    <View style={styles.radioButtonMarginBottom}>
      <Text style={styles.header}>{i18n.t( "settings.language" ).toLocaleUpperCase()}</Text>
      {deviceLanguageSupported && (
        <View style={[styles.row, styles.checkboxRow]}>
          <Checkbox
            checkBoxColor={colors.checkboxColor}
            isChecked={isChecked}
            disabled={isChecked}
            onClick={setDeviceLanguage}
            style={styles.checkBox}
          />
          <Text style={[styles.text, styles.padding]}>{i18n.t( "settings.device_settings" )}</Text>
        </View>
      )}
      <Picker
        handleValueChange={handleValueChange}
        itemList={localeList}
        testId="picker"
        disabled={!displayLanguage}
      >
        {renderLanguagePicker}
      </Picker>
    </View>
  );
};

export default LanguagePicker;
