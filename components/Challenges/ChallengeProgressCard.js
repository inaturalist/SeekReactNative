// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/challenges/challenges";
import PercentCircle from "./PercentCircle";
import { startChallenge, recalculateChallenges } from "../../utility/challengeHelpers";
import icons from "../../assets/icons";

type Props = {
  navigation: any,
  item: Object,
  fetchChallenges: Function
}

const ChallengeProgressCard = ( { navigation, item, fetchChallenges }: Props ) => {
  let rightIcon;

  if ( item.percentComplete === 100 ) {
    rightIcon = (
      <View style={styles.startButton}>
        <Image source={icons.completed} />
      </View>
    );
  } else if ( item.started && item.percentComplete !== 100 ) {
    rightIcon = (
      <View style={styles.startButton}>
        <PercentCircle challenge={item} />
      </View>
    );
  } else {
    rightIcon = (
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => {
          startChallenge( item.index );
          fetchChallenges();
          recalculateChallenges();
          navigation.navigate( "ChallengeDetails", { index: item.index } );
        }}
      >
        <Text style={styles.greenText}>{i18n.t( "challenges.start_now" ).toLocaleUpperCase()}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate( "ChallengeDetails", { index: item.index } )}
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
        {rightIcon}
      </TouchableOpacity>
      <View style={styles.divider} />
    </View>
  );
};

export default ChallengeProgressCard;
