// @flow

import React, { useContext } from "react";
import { View, Text, Switch } from "react-native";
import { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";

import i18n from "../../i18n";
import styles from "../../styles/settings";
import { toggleScientificNames, toggleCameraCapture } from "../../utility/settingsHelpers";
import { colors } from "../../styles/global";
import { CameraContext } from "../UserContext";

const CameraSettings = () => {
  const {
    scientificNames,
    toggleNames,
    autoCapture,
    toggleAutoCapture
  } = useContext( CameraContext );
  const radioButtons = [
    { label: i18n.t( "settings.common_names" ), value: 0 },
    { label: i18n.t( "settings.scientific_names" ), value: 1 }
  ];

  const updateIndex = ( i ) => {
    if ( i === 0 ) {
      toggleScientificNames( false );
      toggleNames( false );
    } else {
      toggleScientificNames( true );
      toggleNames( true );
    }
  };

  const setAutoCapture = ( boolean ) => {
    toggleCameraCapture( boolean );
    toggleAutoCapture( boolean );
  };

  const handleSwitchValueChange = ( ) => setAutoCapture( !autoCapture );

  const switchTrackColor = { true: colors.seekForestGreen };

  const handleRadioButtonPress = ( value ) => updateIndex( value );

  return (
    <>
      <Text style={styles.header}>{i18n.t( "settings.header" ).toLocaleUpperCase()}</Text>
      <View style={styles.radioButtonSmallMargin}>
        {radioButtons.map( ( obj, i ) => (
          <RadioButton
            key={`${obj.label}${i}`}
            style={styles.radioMargin}
          >
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={
                ( i === 0 && !scientificNames ) || ( i === 1 && scientificNames )
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
              labelStyle={styles.text}
              accessible
              accessibilityLabel={radioButtons[i].label}
            />
          </RadioButton>
        ) )}
      </View>
      <View style={[styles.row, styles.radioButtonSmallMargin]}>
        <Switch
          style={styles.switch}
          value={autoCapture}
          trackColor={switchTrackColor}
          onValueChange={handleSwitchValueChange}
          accessible
          accessibilityLabel={i18n.t( "settings.auto_capture" )}
        />
        <Text style={[styles.text, styles.padding, styles.textWidth]}>
          {i18n.t( "settings.auto_capture" )}
        </Text>
      </View>
    </>
  );
};

export default CameraSettings;
