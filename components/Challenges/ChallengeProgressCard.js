// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import { withNavigation } from "react-navigation";

import i18n from "../../i18n";
import styles from "../../styles/challenges/challenges";
import PercentCircle from "./PercentCircle";
import { startChallenge, recalculateChallenges, setChallengeIndex } from "../../utility/challengeHelpers";
import { setRoute } from "../../utility/helpers";
import icons from "../../assets/icons";

type Props = {
  +navigation: any,
  +item: Object,
  +fetchChallenges?: Function
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
  } else if ( fetchChallenges ) {
    rightIcon = (
      <TouchableOpacity
        accessibilityLabel={`${i18n.t( "challenges.start_now" )}${item.name}`}
        accessible
        onPress={() => {
          setChallengeIndex( item.index );
          setRoute( "Challenges" );
          startChallenge( item.index );
          fetchChallenges();
          recalculateChallenges();
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
        setRoute( "Challenges" );
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

ChallengeProgressCard.defaultProps = {
  fetchChallenges: () => {}
};

export default withNavigation( ChallengeProgressCard );
