// @flow

import React from "react";
import {
  Text
} from "react-native";
import ProgressCircle from "react-native-progress-circle";

import styles from "../../styles/challenges/circle";
import { colors } from "../../styles/global";

type Props = {
  item: Object
}

const PercentCircle = ( { item }: Props ) => (
  <ProgressCircle
    outerCircleStyle={styles.circleStyle}
    percent={item.percentComplete}
    radius={59 / 2}
    borderWidth={3}
    color={colors.seekiNatGreen}
    shadowColor={colors.circleGray}
    bgColor={colors.white}
  >
    <Text style={styles.circleText}>
      {item.percentComplete}
      {"%"}
    </Text>
  </ProgressCircle>
);

export default PercentCircle;
