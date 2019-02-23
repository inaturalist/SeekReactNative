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

const WelcomeScreen = ( { navigation }: Props ) => (
  <LinearGradient
    style={styles.container}
    colors={[colors.seekGreen, colors.seekTeal]}
  >
    <Text style={styles.headerText}>{i18n.t( "inat_signup.welcome" )}</Text>
    <View style={styles.secondHeaderTextContainer}>
      <Text style={styles.secondHeaderText}>{i18n.t( "inat_signup.explore" )}</Text>
    </View>
    <View style={{ flexGrow: 1 }} />
    <TouchableOpacity
      style={styles.greenButton}
      onPress={() => navigation.navigate( "Main" )}
    >
      <Text style={styles.buttonText}>{i18n.t( "inat_signup.continue" )}</Text>
    </TouchableOpacity>
    <View style={styles.aboutTextContainer}>
      <Text style={styles.text}>{i18n.t( "inat_signup.data_usage" )}</Text>
    </View>
    <Text
      style={[styles.textLink, { fontSize: 17, marginBottom: 37 }]}
      onPress={() => navigation.navigate( "Privacy" )}
    >
      {i18n.t( "inat_signup.privacy" )}
    </Text>
  </LinearGradient>
);

export default WelcomeScreen;
