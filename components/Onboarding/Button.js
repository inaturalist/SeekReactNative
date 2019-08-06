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
    hitSlop={styles.touchable}
    style={styles.buttonContainer}
    onPress={() => navigation.navigate( "Login" )}
  >
    {index === 2
      ? (
        <View style={[styles.button, { backgroundColor: colors.seekTeal }]}>
          <Text style={styles.skip}>{i18n.t( "onboarding.continue" ).toLocaleUpperCase()}</Text>
        </View>
      ) : <Text style={styles.skipText}>{i18n.t( "onboarding.skip" )}</Text>}
  </TouchableOpacity>
);

export default Button;
