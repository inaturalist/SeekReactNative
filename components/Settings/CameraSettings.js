// @flow

import React, { useState, useEffect } from "react";
import { View, Text, Switch } from "react-native";
import { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import Realm from "realm";
import type { Node } from "react";

import i18n from "../../i18n";
import { viewStyles, textStyles } from "../../styles/settings";
import { updateUserSetting } from "../../utility/settingsHelpers";
import { colors } from "../../styles/global";
import realmConfig from "../../models";

const CameraSettings = ( ): Node => {
  const [settings, setSettings] = useState( {} );
  const radioButtons = [
    { label: i18n.t( "settings.common_names" ), value: 0 },
    { label: i18n.t( "settings.scientific_names" ), value: 1 }
  ];

  const updateIndex = async( i ) => {
    const newValue = i !== 0;
    if ( newValue === settings.scientificNames ) {
      return;
    }
    const value = await updateUserSetting( "scientificNames", newValue );
    const newSettings: Object = {
      autoCapture: settings.autoCapture,
      scientificNames: value
    };
    setSettings( newSettings );
  };

  const setAutoCapture = async ( ) => {
    const value = await updateUserSetting( "autoCapture", !settings.autoCapture );
    const newSettings: Object = {
      scientificNames: settings.scientificNames,
      autoCapture: value
    };
    setSettings( newSettings );
  };

  const switchTrackColor = { true: colors.seekForestGreen };

  const handleRadioButtonPress = ( value ) => updateIndex( value );

  useEffect( ( ) => {
    let isCurrent = true;

    const fetchUserSettings = async ( ) => {
      const realm = await Realm.open( realmConfig );
      const userSettings = realm.objects( "UserSettingsRealm" );
      if ( isCurrent ) {
        setSettings( userSettings[0] );
      }
    };
    fetchUserSettings( );
    return ( ) => {
      isCurrent = false;
    };
  }, [] );

  return (
    <>
      <Text style={textStyles.header}>{i18n.t( "settings.header" ).toLocaleUpperCase()}</Text>
      <View style={viewStyles.radioButtonSmallMargin}>
        {radioButtons.map( ( obj, i ) => (
          <RadioButton
            key={`${obj.label}${i}`}
            style={viewStyles.radioMargin}
          >
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={
                ( i === 0 && !settings.scientificNames ) || ( i === 1 && settings.scientificNames )
              }
              onPress={handleRadioButtonPress}
              borderWidth={1}
              buttonInnerColor={colors.seekForestGreen}
              buttonOuterColor={colors.seekForestGreen}
              buttonSize={12}
              buttonOuterSize={20}
              accessible
              accessibilityLabel={radioButtons[i].value.toString( )}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              onPress={handleRadioButtonPress}
              labelHorizontal
              labelStyle={textStyles.text}
              accessible
              accessibilityLabel={radioButtons[i].label}
            />
          </RadioButton>
        ) )}
      </View>
      <View style={[viewStyles.row, viewStyles.radioButtonSmallMargin]}>
        <Switch
          style={viewStyles.switch}
          value={settings.autoCapture}
          trackColor={switchTrackColor}
          onValueChange={setAutoCapture}
          accessible
          accessibilityLabel={settings.autoCapture ? i18n.t( "posting.yes" ) : i18n.t( "posting.no" )}
        />
        <Text style={textStyles.autoCaptureText}>
          {i18n.t( "settings.auto_capture" )}
        </Text>
      </View>
    </>
  );
};

export default CameraSettings;
