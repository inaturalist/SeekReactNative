// @flow

import React from "react";
import {
  Text,
  View
} from "react-native";
import ProgressCircle from "react-native-progress-circle";

import styles from "../../styles/uiComponents/percentCircle";
import { colors } from "../../styles/global";
import { calculatePercent } from "../../utility/challengeHelpers";

type Props = {
  +badge: Object,
  +iconicSpeciesCount: ?number
}

const LargeProgressCircle = ( { badge, iconicSpeciesCount }: Props ) => (
  <View style={styles.center}>
    <ProgressCircle
      bgColor={colors.white}
      borderWidth={3}
      color={colors.seekiNatGreen}
      outerCircleStyle={styles.largeCircleStyle}
      percent={calculatePercent( iconicSpeciesCount, badge.count )}
      radius={113 / 2}
      shadowColor={colors.circleGray}
    >
      <Text allowFontScaling={false} style={styles.largeCircleText}>
        {iconicSpeciesCount}
        {"/"}
        {badge.count}
      </Text>
    </ProgressCircle>
  </View>
);

export default LargeProgressCircle;
