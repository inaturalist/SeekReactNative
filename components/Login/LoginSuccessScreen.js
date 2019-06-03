// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView
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
    <SafeAreaView style={[styles.safeViewTop, { backgroundColor: "#50c49c" }]} />
    <SafeAreaView style={styles.safeView}>
      <View style={styles.innerContainer}>
        <View style={styles.greenButtonMargin} />
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
        <View style={{ marginTop: 20 }} />
        <Text style={styles.text}>{i18n.t( "inat_signup.data_usage" )}</Text>
        <View style={styles.row}>
          <Text
            style={styles.textLink}
            onPress={() => navigation.navigate( "Privacy" )}
          >
            {i18n.t( "inat_signup.privacy" )}
          </Text>
          <Text
            style={[styles.textLink, { marginLeft: 14 }]}
            onPress={() => navigation.navigate( "TermsOfService" )}
          >
            {i18n.t( "inat_signup.terms" )}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  </LinearGradient>
);

export default LoginSuccessScreen;
