import React from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/onboarding";
import { colors } from "../../styles/global";

type Props = {
  navigation: any,
  index: number
}

const Button = ( { navigation, index }: Props ) => (
  <TouchableOpacity
    onPress={() => navigation.navigate( "Main" )}
  >
    <View style={styles.buttonContainer}>
      { index === 2
        ? (
          <View style={[styles.button, { backgroundColor: colors.seekTeal }]}>
            <Text style={styles.skip}>{i18n.t( "onboarding.continue" ).toLocaleUpperCase()}</Text>
          </View>
        ) : (
          <View style={[styles.button, index === 1 && { backgroundColor: "#318b7a" }]}>
            <Text style={styles.skip}>{i18n.t( "onboarding.next" ).toLocaleUpperCase()}</Text>
          </View>
        )
      }
    </View>
  </TouchableOpacity>
);

export default Button;
