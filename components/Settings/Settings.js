import React, { useContext } from "react";
import { View, Text, Platform } from "react-native";
import { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/settings";
import { toggleScientificNames } from "../../utility/settingsHelpers";
import { colors } from "../../styles/global";
import { ScientificNamesContext, UserContext } from "../UserContext";
import LanguagePicker from "./LanguagePicker";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import ScrollWithHeader from "../UIComponents/ScrollWithHeader";

const SettingsScreen = () => {
  const { navigate } = useNavigation();
  const { login } = useContext( UserContext );
  const { scientificNames, toggleNames } = useContext( ScientificNamesContext );
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

  return (
    <ScrollWithHeader header="menu.settings">
      <View style={[styles.marginHorizontal, styles.marginTop]}>
        <Text style={styles.header}>{i18n.t( "settings.header" ).toLocaleUpperCase()}</Text>
        <View style={styles.marginSmall}>
          {radioButtons.map( ( obj, i ) => (
            <RadioButton
              key={`${obj}${i}`}
              style={styles.radioMargin}
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
              />
            </RadioButton>
          ) )}
        </View>
        <LanguagePicker />
        {( login && Platform.OS === "android" ) && (
          <View style={styles.margin}>
            <Text style={styles.header}>{i18n.t( "settings.donate_header" ).toLocaleUpperCase()}</Text>
            <View style={styles.marginSmall} />
            <Text style={styles.text}>{i18n.t( "settings.donate_description" )}</Text>
            <View style={styles.marginMedium} />
            <GreenButton
              text="settings.donate"
              handlePress={() => navigate( "Donation" )}
            />
            <View style={styles.marginTop} />
            <View style={styles.marginTop} />
          </View>
        )}
      </View>
    </ScrollWithHeader>
  );
};

export default SettingsScreen;
