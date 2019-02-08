// @flow

import React from "react";
import {
  Text,
  View
} from "react-native";
import ProgressCircle from "react-native-progress-circle";

import styles from "../../styles/badges/progressCircle";
import { colors } from "../../styles/global";

type Props = {
  badge: Object
}

const LargeProgressCircle = ( { badge }: Props ) => (
  <View style={styles.center}>
    <ProgressCircle
      outerCircleStyle={styles.circleStyle}
      percent={badge.count}
      radius={113 / 2}
      borderWidth={3}
      color={colors.seekiNatGreen}
      shadowColor={colors.circleGray}
      bgColor={colors.white}
    >
      <Text style={styles.circleText}>
        {badge.count}
      </Text>
    </ProgressCircle>
  </View>
);

export default LargeProgressCircle;
