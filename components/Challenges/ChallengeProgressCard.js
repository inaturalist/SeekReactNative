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
import { startChallenge, recalculateChallenges, setChallengeIndex } from "../../utility/challengeHelpers";
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
          setChallengeIndex( item.index );
          startChallenge( item.index );
          fetchChallenges();
          recalculateChallenges();
          navigation.navigate( "ChallengeDetails" );
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
        onPress={() => {
          setChallengeIndex( item.index );
          navigation.navigate( "ChallengeDetails" );
        }}
      >
        <Image style={styles.image} source={item.iconName} />
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
    </View>
  );
};

export default ChallengeProgressCard;
