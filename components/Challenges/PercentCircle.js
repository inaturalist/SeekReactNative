// @flow

import React from "react";
import {
  Text
} from "react-native";
import ProgressCircle from "react-native-progress-circle";

import styles from "../../styles/challenges/circle";
import { colors } from "../../styles/global";

type Props = {
  +challenge: Object
}

const PercentCircle = ( { challenge }: Props ) => (
  <ProgressCircle
    bgColor={colors.white}
    borderWidth={3}
    color={colors.seekiNatGreen}
    outerCircleStyle={styles.circleStyle}
    percent={challenge.percentComplete}
    radius={59 / 2}
    shadowColor={colors.circleGray}
  >
    <Text style={styles.circleText}>
      {challenge.percentComplete}
      {"%"}
    </Text>
  </ProgressCircle>
);

export default PercentCircle;
