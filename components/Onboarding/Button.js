import React from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/onboarding";

type Props = {
  navigation: any
}

const Button = ( { navigation }: Props ) => (
  <TouchableOpacity
    onPress={() => navigation.navigate( "Login" )}
  >
    <View style={styles.buttonContainer}>
      <Text style={styles.skip}>{i18n.t( "onboarding.skip" )}</Text>
    </View>
  </TouchableOpacity>
);

export default Button;
