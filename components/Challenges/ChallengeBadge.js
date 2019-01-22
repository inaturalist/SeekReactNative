import React from "react";
import { View, Text, Image } from "react-native";

import styles from "../../styles/challenges/challengeMission";
import i18n from "../../i18n";

const month = "April";

const ChallengeBadge = () => (
  <View style={styles.container}>
    <View style={styles.badgeHeader}>
      <Image source={require( "../../assets/onboarding/img-onboarding2.png" )} />
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.headerText}>
        {i18n.t( "challenges.congrats", { defaultValue: "{{month}}", month } )}
      </Text>
      <Text style={styles.text}>
        {i18n.t( "challenges.thanks" )}
      </Text>
    </View>
  </View>
);

export default ChallengeBadge;
