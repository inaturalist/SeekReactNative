// @flow

import React from "react";
import {
  Text,
  View
} from "react-native";
import ProgressCircle from "react-native-progress-circle";

import styles from "../../styles/badges/progressCircle";
import { colors } from "../../styles/global";
import { calculatePercent } from "../../utility/challengeHelpers";

type Props = {
  +badge: Object,
  +iconicSpeciesCount: number
}

const LargeProgressCircle = ( { badge, iconicSpeciesCount }: Props ) => (
  <View style={styles.center}>
    <ProgressCircle
      bgColor={colors.white}
      borderWidth={3}
      color={colors.seekiNatGreen}
      outerCircleStyle={styles.circleStyle}
      percent={calculatePercent( iconicSpeciesCount, badge.count )}
      radius={113 / 2}
      shadowColor={colors.circleGray}
    >
      <Text style={styles.circleText}>
        {iconicSpeciesCount}
        {"/"}
        {badge.count}
      </Text>
    </ProgressCircle>
  </View>
);

export default LargeProgressCircle;
