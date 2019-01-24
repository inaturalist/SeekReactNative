// @flow

import React from "react";
import { View, Text, FlatList } from "react-native";
import ProgressCircle from "react-native-progress-circle";

import styles from "../../styles/challenges/challengeMission";
import i18n from "../../i18n";
import { colors } from "../../styles/global";

type Props = {
  percentComplete: number,
  missions: Object
};

const ChallengeMissionCard = ( { percentComplete, missions }: Props ) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {i18n.t( "challenges.your_mission" ).toLocaleUpperCase()}
      </Text>
      <View style={styles.textContainer}>
        <FlatList
          data={missions}
          keyExtractor={( item, i ) => `${item}${i}`}
          renderItem={( { item } ) => (
            <View>
              <Text style={styles.text}>
                {console.log( item, "item in missions" )}
                {i18n.t( item )}
              </Text>
              <Text style={styles.greenText}>
                0 observed so far
              </Text>
            </View>
          )}
        />
        {/* // <Text style={styles.text}>
        //   Find 2 different species of dragonflies!
        // </Text>
        // <Text style={styles.greenText}>
        //   2 observed
        // </Text> */}
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
