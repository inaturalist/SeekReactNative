// @flow

import React, { useContext, useCallback, useMemo } from "react";
import { View, Alert } from "react-native";
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
import StyledText from "../UIComponents/StyledText";

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

    // if the user selects language to be set to device language don't show alert
    if ( value === "device" ) {
      // this changes translations on Settings screen in real-time
      i18n.locale = value;
      toggleLanguage( value );
      toggleLanguagePreference();
      return;
    }

    const valueLabel = languages[value];
    Alert.alert( null, i18n.t( "settings.change_language", { language: valueLabel } ), [
      {
        text: i18n.t( "delete.no" ),
        onPress: ( ) => null,
        style: "cancel"
      }, {
        text: i18n.t( "settings.confirm" ),
        onPress: ( ) => {
          // this changes translations on Settings screen in real-time
          i18n.locale = value;

          toggleLanguage( value );
          toggleLanguagePreference();
        }
      }
    ] );
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
      <StyledText style={[textStyles.text, viewStyles.padding]}>{i18n.t( "settings.device_settings" )}</StyledText>
    </View>
  ), [isChecked, setDeviceLanguage] );

  return (
    <View style={viewStyles.donateMarginBottom}>
      <StyledText style={textStyles.header}>{i18n.t( "settings.language" ).toLocaleUpperCase()}</StyledText>
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
