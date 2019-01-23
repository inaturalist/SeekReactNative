// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import ProgressCircle from "react-native-progress-circle";

import i18n from "../../i18n";
import styles from "../../styles/challenges/challenges";
import { colors } from "../../styles/global";
import { startChallenge } from "../../utility/helpers";

type Props = {
  navigation: any,
  item: Object,
  fetchChallenges: Function
}

const ChallengeProgressCard = ( { navigation, item, fetchChallenges }: Props ) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate( "ChallengeDetails", { month: item.month } )}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.iconName} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {item.name}
        </Text>
        <Text style={styles.messageText}>
          {i18n.t( "challenges.op" )}
          {" - "}
          {item.month}
        </Text>
      </View>
      {item.started ? (
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
      ) : (
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => {
            startChallenge( item.index );
            fetchChallenges();
          }}
        >
          <Text style={styles.greenText}>{i18n.t( "challenges.start_now" ).toLocaleUpperCase()}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
    <View style={styles.divider} />
  </View>
);

export default ChallengeProgressCard;
