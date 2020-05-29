import React, { useContext } from "react";
import { View, Text } from "react-native";
import { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import { useNavigation } from "@react-navigation/native";

import SafeAreaView from "./UIComponents/SafeAreaView";
import GreenHeader from "./UIComponents/GreenHeader";
import i18n from "../i18n";
import styles from "../styles/settings";
import { toggleScientificNames } from "../utility/settingsHelpers";
import { colors } from "../styles/global";
import { ScientificNamesContext, UserContext } from "./UserContext";

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
    <View style={styles.background}>
      <SafeAreaView />
      <GreenHeader header="menu.settings" />
      <View style={[styles.marginHorizontal, styles.margin]}>
        <Text style={styles.header}>{i18n.t( "settings.header" ).toLocaleUpperCase()}</Text>
      </View>
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
      {login && (
        <>
          <View style={[styles.divider, styles.marginSmall]} />
          <View style={[styles.marginHorizontal, styles.margin]}>
            <Text style={styles.header}>{i18n.t( "settings.donate" ).toLocaleUpperCase()}</Text>
            <Text
              style={[styles.linkText, styles.marginSmall, styles.leftMargin]}
              onPress={() => navigate( "Donation" )}
            >
              {i18n.t( "settings.donate_description" )}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default SettingsScreen;
