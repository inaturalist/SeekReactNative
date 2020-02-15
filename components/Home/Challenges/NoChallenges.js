// @flow

import React from "react";
import {
  View,
  Text,
  Image
} from "react-native";

import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import styles from "../../../styles/home/noChallenges";

const NoChallenges = () => (
  <View style={[styles.row, styles.center]}>
    <Image source={icons.completed} />
    <View style={styles.noChallengeTextContainer}>
      <Text style={styles.noChallengeText}>
        {i18n.t( "challenges.completed_all" )}
      </Text>
      <Text style={styles.lightText}>
        {i18n.t( "challenges.no_new_challenges" )}
      </Text>
    </View>
  </View>
);

export default NoChallenges;
