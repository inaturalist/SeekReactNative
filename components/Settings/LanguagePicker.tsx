import React, { useCallback, useMemo, useState } from "react";
import { View, Alert, Platform } from "react-native";
import Checkbox from "react-native-check-box";
import * as RNLocalize from "react-native-localize";
import RNPickerSelect from "react-native-picker-select";

import i18n from "../../i18n";
import { viewStyles } from "../../styles/settings";
import { colors } from "../../styles/global";
import languages from "../../utility/dictionaries/languageDict";
import { useLanguage } from "../Providers/LanguageProvider";
import { toggleLanguage } from "../../utility/settingsHelpers";
import { deviceLanguageSupported, setDisplayLanguage } from "../../utility/languageHelpers";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

const localeList = Object.keys( languages ).map( ( locale ) => (
  { value: locale, label: languages[locale].toLocaleUpperCase() }
) );

const placeholder = {};
const pickerStyles = { ...viewStyles };
const showIcon = () => <></>;

const { languageCode } = RNLocalize.getLocales()[0];

const LanguagePicker = () => {
  const { toggleLanguagePreference, preferredLanguage } = useLanguage( );

  const displayLanguage = setDisplayLanguage( preferredLanguage );
  const isChecked = preferredLanguage === "device" || displayLanguage === languageCode;

  const [pickerValue, setPickerValue] = useState( displayLanguage );

  const showAlert = useCallback( ( value: string ) => {
    const valueLabel = languages[value];
    Alert.alert( null, i18n.t( "settings.change_language", { language: valueLabel } ), [
      {
        text: i18n.t( "delete.no" ),
        onPress: ( ) => null,
        style: "cancel",
      }, {
        text: i18n.t( "settings.confirm" ),
        onPress: ( ) => {
          // this changes translations on Settings screen in real-time
          // eslint-disable-next-line react-hooks/react-compiler
          i18n.locale = value;
          toggleLanguage( value );
          toggleLanguagePreference();
        },
      },
    ] );
  }, [toggleLanguagePreference] );
  
  const handleValueChange = useCallback( ( value: string ) => {
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
    Platform.OS === "ios" ? setPickerValue( value ) : showAlert( value );
  }, [displayLanguage, preferredLanguage, toggleLanguagePreference, showAlert] );

  const onDonePress = useCallback( ( ) => {
    showAlert( pickerValue );
  }, [showAlert, pickerValue] );

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
      <StyledText onPress={setDeviceLanguage} style={baseTextStyles.body}>{i18n.t( "settings.device_settings" )}</StyledText>
    </View>
  ), [isChecked, setDeviceLanguage] );

  return (
    <View style={viewStyles.donateMarginBottom}>
      <StyledText style={baseTextStyles.header}>{i18n.t( "settings.language" ).toLocaleUpperCase()}</StyledText>
      {deviceLanguageSupported( ) && renderDeviceCheckbox}
      <RNPickerSelect
        hideIcon
        Icon={showIcon}
        items={localeList}
        onValueChange={handleValueChange}
        onDonePress={onDonePress}
        placeholder={placeholder}
        useNativeAndroidPickerStyle={false}
        value={Platform.OS === "ios" ? pickerValue : displayLanguage}
        touchableWrapperProps={{ testID: "picker" }}
        disabled={!displayLanguage}
        style={pickerStyles}
        pickerProps={{
          themeVariant: "light",
        }}
      />
    </View>
  );
};

export default LanguagePicker;
