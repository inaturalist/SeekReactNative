// @flow

import React, { useContext } from "react";
import { View, Text } from "react-native";
import { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";

import i18n from "../../i18n";
import styles from "../../styles/settings";
import { toggleSeasonality } from "../../utility/settingsHelpers";
import { useLocationPermission } from "../../utility/customHooks";
import { colors } from "../../styles/global";
import { SpeciesDetailContext } from "../UserContext";

const SpeciesDetail = () => {
  const granted = useLocationPermission();

  const { localSeasonality, toggleLocalSeasonality } = useContext( SpeciesDetailContext );
  const radioButtons = [
    { label: i18n.t( "settings.seasonality_option_1" ), value: 0 },
    { label: i18n.t( "settings.seasonality_option_2" ), value: 1 }
  ];

  const updateIndex = ( i ) => {
    if ( i === 0 ) {
      toggleSeasonality( false );
      toggleLocalSeasonality( false );
    } else {
      toggleSeasonality( true );
      toggleLocalSeasonality( true );
    }
  };

  if ( granted ) {
    return (
      <View style={styles.margin}>
        <Text style={styles.header}>{i18n.t( "settings.species_detail" ).toLocaleUpperCase()}</Text>
        <View style={styles.marginSmall} />
        <Text style={styles.subHeader}>{i18n.t( "settings.seasonality" ).toLocaleUpperCase()}</Text>
        <View style={styles.radioButtonSmallMargin}>
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
                  ( i === 0 && !localSeasonality ) || ( i === 1 && localSeasonality )
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
                labelStyle={[styles.text, styles.radioButtonWidth]}
                accessible
                accessibilityLabel={`${radioButtons[i].label}`}
              />
            </RadioButton>
          ) )}
        </View>
      </View>
    );
  } else {
    return null;
  }
};

export default SpeciesDetail;
