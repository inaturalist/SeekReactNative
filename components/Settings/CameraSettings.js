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

  return (
    <>
      <Text style={styles.header}>{i18n.t( "settings.header" ).toLocaleUpperCase()}</Text>
      <View style={styles.marginSmall}>
        {radioButtons.map( ( obj, i ) => (
          <RadioButton
            key={`${obj.label}${i}`}
            style={styles.radioMargin}
            accessible
            accessibilityLabel={`${radioButtons[i].label},${i}`}
          >
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={
                ( i === 0 && !scientificNames ) || ( i === 1 && scientificNames )
              }
              onPress={( value ) => updateIndex( value )}
              borderWidth={1}
              buttonInnerColor={colors.seekForestGreen}
              buttonOuterColor={colors.seekForestGreen}
              buttonSize={12}
              buttonOuterSize={20}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              onPress={( value ) => updateIndex( value )}
              labelHorizontal
              labelStyle={styles.text}
              accessible
              accessibilityLabel={`${radioButtons[i].label}`}
            />
          </RadioButton>
        ) )}
      </View>
      <View style={[styles.row, styles.marginSmall]}>
        <Switch
          style={styles.switch}
          value={autoCapture}
          trackColor={colors.seekForestGreen}
          onValueChange={() => setAutoCapture( !autoCapture )}
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
