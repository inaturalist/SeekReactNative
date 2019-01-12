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

const CheckEmailScreen = ( { navigation }: Props ) => (
  <LinearGradient
    style={styles.container}
    colors={[colors.seekGreen, colors.seekTeal]}
  >
    <Text style={styles.headerText}>{i18n.t( "inat_login.check_email" )}</Text>
    <View style={styles.noWorriesTextContainer}>
      <Text style={styles.noWorriesText}>{i18n.t( "inat_login.reset_instructions" )}</Text>
    </View>
    <TouchableOpacity
      style={[styles.greenButton, { marginTop: 40 }]}
      onPress={() => navigation.navigate( "Login" )}
    >
      <Text style={styles.buttonText}>{i18n.t( "inat_login.return_login" )}</Text>
    </TouchableOpacity>
  </LinearGradient>
);

export default CheckEmailScreen;
