// @flow

import React from "react";
import { View, Text } from "react-native";
import ProgressCircle from "react-native-progress-circle";

import styles from "../../styles/challenges/challengeMission";
import i18n from "../../i18n";
import { colors } from "../../styles/global";

type Props = {
  percentComplete: number
};

const ChallengeMissionCard = ( { percentComplete }: Props ) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {i18n.t( "challenges.your_mission" ).toLocaleUpperCase()}
      </Text>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Find 20 new species!
        </Text>
        <Text style={styles.greenText}>
          0 observed so far
        </Text>
        <Text style={styles.text}>
          Find 2 different species of dragonflies!
        </Text>
        <Text style={styles.greenText}>
          2 observed
        </Text>
      </View>
      <ProgressCircle
        outerCircleStyle={styles.circleStyle}
        percent={percentComplete}
        radius={59 / 2}
        borderWidth={3}
        color={colors.seekiNatGreen}
        shadowColor={colors.circleGray}
        bgColor={colors.white}
      >
        <Text style={styles.circleText}>
          {percentComplete}
          {"%"}
        </Text>
      </ProgressCircle>
    </View>
  </View>
);

export default ChallengeMissionCard;
