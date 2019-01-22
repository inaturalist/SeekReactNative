// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import { colors } from "../../styles/global";

type Props = {
  navigation: any
}

const ParentCheckEmailScreen = ( { navigation }: Props ) => (
  <LinearGradient
    style={styles.container}
    colors={[colors.seekGreen, colors.seekTeal]}
  >
    <Text style={styles.headerText}>{i18n.t( "inat_signup.thanks" )}</Text>
    <View style={styles.secondHeaderTextContainer}>
      <Text style={styles.secondHeaderText}>{i18n.t( "inat_signup.parent_instructions" )}</Text>
    </View>
    <TouchableOpacity
      style={[styles.greenButton, { marginTop: 40, width: 316 }]}
      onPress={() => navigation.navigate( "Main", {
        taxaName: null,
        id: null,
        taxaType: "all"
      } )}
    >
      <Text style={styles.buttonText}>{i18n.t( "inat_signup.continue_no_log_in" )}</Text>
    </TouchableOpacity>
  </LinearGradient>
);

export default ParentCheckEmailScreen;
