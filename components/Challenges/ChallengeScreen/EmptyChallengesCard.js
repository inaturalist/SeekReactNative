// @flow

import * as React from "react";
import { View, Text } from "react-native";

import { viewStyles, textStyles } from "../../../styles/challenges/emptyChallenges";
import i18n from "../../../i18n";

type Props = {
  type: string
}

const EmptyChallengesCard = ( { type }: Props ): React.Node => (
  <View style={[viewStyles.noChallengeContainer, viewStyles.center]}>
    <Text style={textStyles.noChallengeText}>{i18n.t( `challenges.${type}` )}</Text>
    {type === "no_new_challenges_header" && (
      <Text style={textStyles.lightText}>{i18n.t( "challenges.no_new_challenges" )}</Text>
    )}
  </View>
);

export default EmptyChallengesCard;
