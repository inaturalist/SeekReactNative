// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import ProgressCircle from "react-native-progress-circle";

import styles from "../../styles/challenges/challenges";
import { colors } from "../../styles/global";

type Props = {
  navigation: any,
  item: Object
}

const ChallengeProgressCard = ( { navigation, item }: Props ) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate( "ChallengeDetails" )}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.iconName} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {item.title}
        </Text>
        <Text style={styles.messageText}>
          {item.message}
        </Text>
      </View>
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
    </TouchableOpacity>
    <View style={styles.divider} />
  </View>
);

export default ChallengeProgressCard;
