import React from "react";
import { View } from "react-native";

import i18n from "../../../i18n";
import { textStyles, viewStyles } from "../../../styles/challenges/emptyChallenges";
import { baseTextStyles } from "../../../styles/textStyles";
import StyledText from "../../UIComponents/StyledText";

interface Props {
  type: string;
}

const EmptyChallengesCard = ( { type }: Props ) => (
  <View style={[viewStyles.noChallengeContainer, viewStyles.center]}>
    <StyledText style={[baseTextStyles.emptyState, textStyles.noChallengeText]}>{i18n.t( `challenges.${type}` )}</StyledText>
    {type === "no_new_challenges_header" && (
      <StyledText style={[baseTextStyles.regularGray, textStyles.lightText]}>{i18n.t( "challenges.no_new_challenges" )}</StyledText>
    )}
  </View>
);

export default EmptyChallengesCard;
