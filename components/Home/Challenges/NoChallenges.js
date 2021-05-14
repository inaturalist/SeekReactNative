// @flow

import React from "react";
import { View, Text, Image } from "react-native";
import type { Node } from "react";

import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import styles from "../../../styles/home/noChallenges";

const NoChallenges = ( ): Node => (
  <View style={[styles.row, styles.center]}>
    <Image source={icons.completed} />
    <View style={styles.noChallengeTextContainer}>
      <Text style={[styles.largeText, styles.textWidth]}>
        {i18n.t( "challenges.completed_all" )}
      </Text>
      <Text style={[styles.text, styles.textWidth]}>
        {i18n.t( "challenges.no_new_challenges" )}
      </Text>
    </View>
  </View>
);

export default NoChallenges;
