import React from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/onboarding";

type Props = {
  navigation: any,
  index: number
}

const Button = ( { navigation, index }: Props ) => (
  <TouchableOpacity
    onPress={() => navigation.navigate( "Login" )}
  >
    <View style={styles.buttonContainer}>
      { index === 2
        ? <Text style={styles.skip}>{i18n.t( "onboarding.continue" )}</Text>
        : <Text style={styles.skip}>{i18n.t( "onboarding.skip" )}</Text>
      }
    </View>
  </TouchableOpacity>
);

export default Button;
