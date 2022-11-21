// @flow

import * as React from "react";
import { View } from "react-native";
import ProgressCircle from "react-native-progress-circle";

import { viewStyles, textStyles } from "../../styles/uiComponents/percentCircle";
import { colors } from "../../styles/global";
import { calculatePercent } from "../../utility/challengeHelpers";
import StyledText from "./StyledText";

type Props = {
  +badge: Object,
  +iconicSpeciesCount: number
}

const LargeProgressCircle = ( { badge, iconicSpeciesCount }: Props ): React.Node => (
  <View style={viewStyles.center}>
    <ProgressCircle
      bgColor={colors.white}
      borderWidth={3}
      color={colors.seekiNatGreen}
      outerCircleStyle={viewStyles.largeCircleStyle}
      percent={calculatePercent( iconicSpeciesCount, badge.count )}
      radius={113 / 2}
      shadowColor={colors.circleGray}
    >
      <StyledText allowFontScaling={false} style={textStyles.largeCircleText}>
        {iconicSpeciesCount}
        {"/"}
        {badge.count}
      </StyledText>
    </ProgressCircle>
  </View>
);

export default LargeProgressCircle;
