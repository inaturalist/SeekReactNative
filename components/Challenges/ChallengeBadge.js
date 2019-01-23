import React from "react";
import { View, Text, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import styles from "../../styles/challenges/challengeBadge";
import i18n from "../../i18n";
import logos from "../../assets/logos";

const month = "April";

const ChallengeBadge = () => (
  <View style={styles.container}>
    <LinearGradient
      style={styles.badgeHeader}
      colors={["#67c5ca", "#3ca2ab"]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
    >
      <Image
        source={require( "../../assets/onboarding/img-onboarding2.png" )}
        style={styles.badgeImage}
      />
    </LinearGradient>
    <View style={styles.textContainer}>
      <Text style={styles.headerText}>
        {i18n.t( "challenges.congrats", { defaultValue: "{{month}}", month } )}
      </Text>
      <Text style={styles.text}>
        {i18n.t( "challenges.thanks" )}
      </Text>
      <Image source={logos.wwfop} style={styles.logo} />
    </View>
  </View>
);

export default ChallengeBadge;
