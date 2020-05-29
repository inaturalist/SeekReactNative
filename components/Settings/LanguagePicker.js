import React, { useState, useContext } from "react";
import {
  Text,
  Image,
  View
} from "react-native";

import i18n from "../../i18n";
import icons from "../../assets/icons";
import styles from "../../styles/settings";
import Picker from "../UIComponents/Picker";
import languages from "../../utility/dictionaries/languageDict";
import { LanguageContext } from "../UserContext";
import { toggleLanguage } from "../../utility/settingsHelpers";

const LanguagePicker = () => {
  const { toggleLanguagePreference } = useContext( LanguageContext );
  const [language, setLanguage] = useState( i18n.locale );

  const handleValueChange = ( value ) => {
    console.log( value, "value" );
    i18n.locale = value;

    setLanguage( value );
    toggleLanguage( value );
    toggleLanguagePreference();
  };

  const localeList = Object.keys( languages ).map( ( locale ) => (
    { value: locale, label: languages[locale] }
  ) );

  localeList.unshift( {
    label: i18n.t( "settings.device_settings" ),
    value: "device"
  } );

  return (
    <Picker
      handleValueChange={handleValueChange}
      selectedValue={language}
      icon={<Image source={icons.dropdownOpen} style={styles.margin} />}
      itemList={localeList}
    >
      <View style={[styles.marginHorizontal, styles.margin]}>
        <View style={styles.row}>
          <Text style={styles.header}>{i18n.t( "settings.language" ).toLocaleUpperCase()}</Text>
          <Image source={icons.dropdownOpen} style={styles.leftMargin} />
        </View>
        <Text style={[styles.text, styles.marginSmall, styles.leftMargin]}>
          {language === "device" ? i18n.t( "settings.device_settings" ) : languages[language]}
        </Text>
      </View>
    </Picker>
  );
};

export default LanguagePicker;
