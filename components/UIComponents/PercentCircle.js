// @flow

import * as React from "react";
import { Text } from "react-native";
import ProgressCircle from "react-native-progress-circle";

import { viewStyles, textStyles } from "../../styles/uiComponents/percentCircle";
import { colors } from "../../styles/global";
import { localizePercentage } from "../../utility/helpers";

type Props = {
  +challenge: Object,
  +large?: boolean
}

const PercentCircle = ( { challenge, large }: Props ): React.Node => (
  <ProgressCircle
    bgColor={colors.white}
    borderWidth={3}
    color={colors.seekiNatGreen}
    outerCircleStyle={large ? viewStyles.largeCircleStyle : viewStyles.circleStyle}
    percent={challenge.percentComplete}
    radius={large ? ( 113 / 2 ) : ( 59 / 2 )}
    shadowColor={colors.circleGray}
  >
    <Text allowFontScaling={false} style={large ? textStyles.largeCircleText : textStyles.circleText}>
      {localizePercentage( challenge.percentComplete )}
    </Text>
  </ProgressCircle>
);

PercentCircle.defaultProps = {
  large: false
};

export default PercentCircle;
