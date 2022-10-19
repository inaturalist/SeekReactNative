// @flow

import * as React from "react";
import { View } from "react-native";

import { viewStyles, textStyles } from "../../../styles/challenges/emptyChallenges";
import i18n from "../../../i18n";
import StyledText from "../../UIComponents/StyledText";

type Props = {
  type: string
}

const EmptyChallengesCard = ( { type }: Props ): React.Node => (
  <View style={[viewStyles.noChallengeContainer, viewStyles.center]}>
    <StyledText style={textStyles.noChallengeText}>{i18n.t( `challenges.${type}` )}</StyledText>
    {type === "no_new_challenges_header" && (
      <StyledText style={textStyles.lightText}>{i18n.t( "challenges.no_new_challenges" )}</StyledText>
    )}
  </View>
);

export default EmptyChallengesCard;
