// @flow

import * as React from "react";
import { View, Text } from "react-native";

import styles from "../../styles/challenges/emptyChallenges";
import i18n from "../../i18n";

type Props = {
  type: string
}

const EmptyChallengesCard = ( { type }: Props ): React.Node => (
  <View style={[styles.noChallengeContainer, styles.center]}>
    <Text style={styles.noChallengeText}>{i18n.t( `challenges.${type}` )}</Text>
    {type === "no_new_challenges_header" && (
      <Text style={styles.lightText}>{i18n.t( "challenges.no_new_challenges" )}</Text>
    )}
  </View>
);

export default EmptyChallengesCard;
