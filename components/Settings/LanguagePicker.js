// @flow

import React, { useContext, useCallback, useMemo } from "react";
import { Text, View } from "react-native";
import Checkbox from "react-native-check-box";
import * as RNLocalize from "react-native-localize";
import RNPickerSelect from "react-native-picker-select";
import type { Node } from "react";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/settings";
import { colors } from "../../styles/global";
import languages from "../../utility/dictionaries/languageDict";
import { LanguageContext } from "../UserContext";
import { toggleLanguage } from "../../utility/settingsHelpers";
import { deviceLanguageSupported, setDisplayLanguage } from "../../utility/languageHelpers";

const localeList = Object.keys( languages ).map( ( locale ) => (
  { value: locale, label: languages[locale].toLocaleUpperCase() }
) );

const placeholder = {};
const pickerStyles = { ...viewStyles };
const showIcon = () => <></>;

const { languageCode } = RNLocalize.getLocales()[0];

const LanguagePicker = (): Node => {
  const { toggleLanguagePreference, preferredLanguage } = useContext( LanguageContext );

  const displayLanguage = setDisplayLanguage( preferredLanguage );
  const isChecked = preferredLanguage === "device" || displayLanguage === languageCode;

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

  const setDeviceLanguage = useCallback( () => handleValueChange( "device" ), [handleValueChange] );

  const renderDeviceCheckbox = useMemo( () => (
    <View style={[viewStyles.row, viewStyles.checkboxRow]}>
      {/* accessibility isn't available for this component, and it's also not
      implemented on iOS for the official react-native-checkbox library
      https://github.com/crazycodeboy/react-native-check-box/issues/94 */}
      <Checkbox
        checkBoxColor={colors.checkboxColor}
        isChecked={isChecked}
        disabled={isChecked}
        onClick={setDeviceLanguage}
        style={viewStyles.checkBox}
      />
      <Text style={[textStyles.text, viewStyles.padding]}>{i18n.t( "settings.device_settings" )}</Text>
    </View>
  ), [isChecked, setDeviceLanguage] );

  return (
    <View style={viewStyles.donateMarginBottom}>
      <Text style={textStyles.header}>{i18n.t( "settings.language" ).toLocaleUpperCase()}</Text>
      {deviceLanguageSupported( ) && renderDeviceCheckbox}
      <RNPickerSelect
        hideIcon
        Icon={showIcon}
        items={localeList}
        onValueChange={handleValueChange}
        placeholder={placeholder}
        useNativeAndroidPickerStyle={false}
        value={displayLanguage}
        testId="picker"
        disabled={!displayLanguage}
        style={pickerStyles}
      />
    </View>
  );
};

export default LanguagePicker;
