import React, { useState } from "react";
import { View, Text } from "react-native";
import { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";

import SafeAreaView from "./UIComponents/SafeAreaView";
import GreenHeader from "./UIComponents/GreenHeader";
import i18n from "../i18n";
import styles from "../styles/settings";
import { toggleScientificNames } from "../utility/settingsHelpers";
import { colors } from "../styles/global";
import { ScientificNamesContext } from "./UserContext";

const SettingsScreen = () => {
  const [index, setIndex] = useState( 0 );

  const radioButtons = [
    { label: i18n.t( "settings.common_names" ), value: 0 },
    { label: i18n.t( "settings.scientific_names" ), value: 1 }
  ];

  const updateIndex = ( i, names ) => {
    setIndex( i );
    if ( i === 0 ) {
      toggleScientificNames( false );
      names.toggleNames( false );
    } else {
      toggleScientificNames( true );
      names.toggleNames( true );
    }
  };

  return (
    <View style={styles.background}>
      <SafeAreaView />
      <GreenHeader header="menu.settings" />
      <View style={[styles.marginHorizontal, styles.margin]}>
        <Text style={styles.header}>{i18n.t( "settings.header" ).toLocaleUpperCase()}</Text>
      </View>
      <ScientificNamesContext.Consumer>
        {names => (
          <View style={styles.marginSmall}>
            {console.log( names, "sci names" )}
            {radioButtons.map( ( obj, i ) => (
              <RadioButton
                key={`${obj}${i}`}
                style={styles.radioMargin}
              >
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={i === index}
                  onPress={( value ) => updateIndex( value, names )}
                  borderWidth={1}
                  buttonInnerColor={colors.seekForestGreen}
                  buttonOuterColor={colors.seekForestGreen}
                  buttonSize={12}
                  buttonOuterSize={20}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  onPress={( value ) => updateIndex( value, names )}
                  labelHorizontal
                  labelStyle={styles.text}
                />
              </RadioButton>
            ) ) }
          </View>
        ) }
      </ScientificNamesContext.Consumer>
    </View>
  );
};

export default SettingsScreen;
