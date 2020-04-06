// @flow
import React from "react";
import {
  View,
  TouchableOpacity,
  Text
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import styles from "../../styles/onboarding";
import i18n from "../../i18n";

type Props = {
  index: number
}

const Button = ( { index }: Props ) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate( "Login" )}
      style={[styles.buttonContainer, styles.center]}
    >
      {index === 2
        ? (
          <View style={styles.button}>
            <Text style={styles.continue}>{i18n.t( "onboarding.continue" ).toLocaleUpperCase()}</Text>
          </View>
        ) : (
          <Text style={[styles.skipText, styles.buttonHeight]}>{i18n.t( "onboarding.skip" )}</Text>
        )}
    </TouchableOpacity>
  );
};

export default Button;
