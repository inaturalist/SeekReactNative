import React from "react";
import ProgressCircle from "react-native-progress-circle";

import { viewStyles, textStyles } from "../../styles/uiComponents/percentCircle";
import { colors } from "../../styles/global";
import { localizePercentage } from "../../utility/helpers";
import StyledText from "./StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  readonly challenge: {
    percentComplete: number;
  };
  readonly large?: boolean;
}

const PercentCircle = ( { challenge, large = false }: Props ) => (
  <ProgressCircle
    bgColor={colors.white}
    borderWidth={3}
    color={colors.seekiNatGreen}
    outerCircleStyle={large ? viewStyles.largeCircleStyle : viewStyles.circleStyle}
    percent={challenge.percentComplete}
    radius={large ? ( 113 / 2 ) : ( 59 / 2 )}
    shadowColor={colors.circleGray}
  >
    <StyledText
      allowFontScaling={false}
      style={large ? [baseTextStyles.regular, textStyles.largeCircleText] : [baseTextStyles.regular, textStyles.circleText]}
    >
      {localizePercentage( challenge.percentComplete )}
    </StyledText>
  </ProgressCircle>
);

export default PercentCircle;
