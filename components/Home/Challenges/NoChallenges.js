// @flow

import React from "react";
import { View, Image } from "react-native";
import type { Node } from "react";

import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import { viewStyles, textStyles } from "../../../styles/home/noChallenges";
import StyledText from "../../UIComponents/StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

const NoChallenges = ( ): Node => (
  <View style={[viewStyles.row, viewStyles.center]}>
    <Image source={icons.completed} />
    <View style={viewStyles.noChallengeTextContainer}>
      <StyledText style={[baseTextStyles.emptyState, textStyles.textWidth]}>
        {i18n.t( "challenges.completed_all" )}
      </StyledText>
      <StyledText style={[baseTextStyles.body, textStyles.text, textStyles.textWidth]}>
        {i18n.t( "challenges.no_new_challenges" )}
      </StyledText>
    </View>
  </View>
);

export default NoChallenges;
