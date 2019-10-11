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
import { setDrawer } from "../../utility/helpers";

type Props = {
  +navigation: any,
  +item: Object,
  +fetchChallenges: Function
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
        onPress={() => {
          setChallengeIndex( item.index );
          startChallenge( item.index );
          fetchChallenges();
          recalculateChallenges();
          setDrawer( "Main" );
          navigation.navigate( "ChallengeDetails" );
        }}
        style={styles.startButton}
      >
        <Text style={styles.greenText}>{i18n.t( "challenges.start_now" ).toLocaleUpperCase()}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        setChallengeIndex( item.index );
        setDrawer( "Main" );
        navigation.navigate( "ChallengeDetails" );
      }}
      style={[styles.card, styles.row]}
    >
      <Image source={item.iconName} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {item.name.toLocaleUpperCase()}
        </Text>
        <Text style={styles.messageText}>
          {i18n.t( "challenges.op" )}
          {" - "}
          {item.month}
        </Text>
      </View>
      {rightIcon}
    </TouchableOpacity>
  );
};

export default ChallengeProgressCard;
