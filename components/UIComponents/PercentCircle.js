// @flow

import React from "react";
import {
  Text
} from "react-native";
import ProgressCircle from "react-native-progress-circle";

import styles from "../../styles/uiComponents/percentCircle";
import { colors } from "../../styles/global";

type Props = {
  +challenge: Object,
  +large?: boolean
}

const PercentCircle = ( { challenge, large }: Props ) => (
  <ProgressCircle
    bgColor={colors.white}
    borderWidth={3}
    color={colors.seekiNatGreen}
    outerCircleStyle={large ? styles.largeCircleStyle : styles.circleStyle}
    percent={challenge.percentComplete}
    radius={large ? ( 113 / 2 ) : ( 59 / 2 )}
    shadowColor={colors.circleGray}
  >
    <Text style={large ? styles.largeCircleText : styles.circleText}>
      {challenge.percentComplete}
      {"%"}
    </Text>
  </ProgressCircle>
);

PercentCircle.defaultProps = {
  large: false
};

export default PercentCircle;
