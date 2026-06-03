import React from "react";
import { Image, View } from "react-native";

import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import { textStyles, viewStyles } from "../../../styles/home/noChallenges";
import { baseTextStyles } from "../../../styles/textStyles";
import StyledText from "../../UIComponents/StyledText";

const NoChallenges = ( ) => (
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
