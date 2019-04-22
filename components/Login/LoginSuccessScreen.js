// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

import i18n from "../../i18n";
import styles from "../../styles/login/login";
import badges from "../../assets/badges";

type Props = {
  navigation: any
}

const LoginSuccessScreen = ( { navigation }: Props ) => (
  <LinearGradient
    style={styles.container}
    colors={["#50c49c", "#1b6537"]}
  >
    <Text style={styles.headerText}>
      {i18n.t( "inat_signup.welcome" ).toLocaleUpperCase()}
    </Text>
    <View style={styles.secondHeaderTextContainer}>
      <Text style={styles.secondHeaderText}>{i18n.t( "inat_signup.explore" )}</Text>
    </View>
    <Image
      source={badges["levelbadge-0"]}
      style={styles.image}
    />
    <TouchableOpacity
      style={styles.greenButton}
      onPress={() => navigation.navigate( "Main" )}
    >
      <Text style={styles.buttonText}>
        {i18n.t( "inat_signup.continue" ).toLocaleUpperCase()}
      </Text>
    </TouchableOpacity>
    <Text style={styles.text}>{i18n.t( "inat_signup.data_usage" )}</Text>
    <Text
      style={styles.textLink}
      onPress={() => navigation.navigate( "Privacy" )}
    >
      {i18n.t( "inat_signup.privacy" )}
    </Text>
  </LinearGradient>
);

export default LoginSuccessScreen;
