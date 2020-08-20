import React, { useContext, useState, useEffect } from "react";
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

const LanguagePicker = () => {
  const { languageTag } = RNLocalize.getLocales()[0];
  const deviceLanguage = languageTag.split( "-" )[0].toLowerCase();
  const deviceLanguageSupported = Object.keys( languages ).includes( deviceLanguage );

  const localeList = Object.keys( languages ).map( ( locale ) => (
    { value: locale, label: languages[locale] }
  ) );

  const { toggleLanguagePreference, preferredLanguage } = useContext( LanguageContext );
  const [displayLanguage, setDisplayLanguage] = useState( null );
  const isChecked = preferredLanguage === "device" || displayLanguage === deviceLanguage;

  const handleValueChange = ( value ) => {
    if ( value === displayLanguage && preferredLanguage === "device" ) {
      // this prevents the double render on new Android install
      // without this, the user changes the language
      // and handleValueChange is immediately called with "en"
      return;
    }
    if ( value === preferredLanguage ) { // only update state if new language is desired
      return;
    }

    i18n.locale = value; // this changes translations on Settings screen in real-time

    toggleLanguage( value );
    toggleLanguagePreference();
  };

  useEffect( () => {
    const chooseDisplayLanguage = () => {
      if ( preferredLanguage === "device" ) {
        setDisplayLanguage( deviceLanguageSupported ? deviceLanguage : "en" );
      } else {
        setDisplayLanguage( preferredLanguage );
      }
    };

    if ( preferredLanguage ) {
      chooseDisplayLanguage();
    }
  }, [preferredLanguage, displayLanguage, deviceLanguage, deviceLanguageSupported] );

  return (
    <View style={styles.marginTop}>
      <Text style={styles.header}>{i18n.t( "settings.language" ).toLocaleUpperCase()}</Text>
      {deviceLanguageSupported && (
        <View style={[styles.row, styles.checkboxRow]}>
          <Checkbox
            checkBoxColor={colors.checkboxColor}
            isChecked={isChecked}
            disabled={isChecked}
            onClick={() => handleValueChange( "device" )}
            style={styles.checkBox}
          />
          <Text style={[styles.text, styles.padding]}>{i18n.t( "settings.device_settings" )}</Text>
        </View>
      )}
      {displayLanguage && (
        <Picker
          handleValueChange={handleValueChange}
          selectedValue={displayLanguage}
          itemList={localeList}
          testId="picker"
        >
          <View style={[styles.marginGreenButton, styles.center]}>
            <View style={styles.greenButton}>
              <Text style={styles.languageText}>
                {languages[displayLanguage].toLocaleUpperCase()}
              </Text>
            </View>
          </View>
        </Picker>
      )}
    </View>
  );
};

export default LanguagePicker;
