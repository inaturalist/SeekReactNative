// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { isAfter } from "date-fns";

import i18n from "../../i18n";
import styles from "../../styles/challenges/challengeProgress";
import PercentCircle from "../UIComponents/PercentCircle";
import { startChallenge, recalculateChallenges, setChallengeIndex } from "../../utility/challengeHelpers";
import icons from "../../assets/icons";
import { formatMonthYear } from "../../utility/dateHelpers";
import badges from "../../assets/badges";

type Props = {
  +challenge: Object,
  +fetchChallenges?: Function
}

const ChallengeProgressCard = ( { challenge, fetchChallenges }: Props ) => {
  const navigation = useNavigation();
  const {
    name,
    availableDate,
    percentComplete,
    startedDate,
    index,
    earnedIconName
  } = challenge;
  const is2020Challenge = challenge && isAfter( availableDate, new Date( 2020, 2, 1 ) );

  let rightIcon;

  let leftIcon;

  if ( startedDate && percentComplete === 100 ) {
    leftIcon = badges[earnedIconName];
  } else {
    leftIcon = badges.badge_empty;
  }

  if ( percentComplete === 100 ) {
    rightIcon = <Image source={icons.completed} />;
  } else if ( startedDate && percentComplete !== 100 ) {
    rightIcon = <PercentCircle challenge={challenge} />;
  } else if ( fetchChallenges ) {
    rightIcon = (
      <Text
        accessibilityLabel={`${i18n.t( "challenges.start_now" )}${name}`}
        accessible
        onPress={() => {
          setChallengeIndex( index );
          startChallenge( index );
          fetchChallenges();
          recalculateChallenges();
          navigation.navigate( "ChallengeDetails" );
        }}
        style={styles.startText}
      >
        {i18n.t( "challenges.start_now" ).toLocaleUpperCase()}
      </Text>
    );
  }

  return (
    <TouchableOpacity
      onPress={() => {
        setChallengeIndex( index );
        navigation.navigate( "ChallengeDetails" );
      }}
      style={[styles.card, styles.row]}
    >
      <Image source={leftIcon} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {i18n.t( name ).toLocaleUpperCase()}
        </Text>
        <Text style={styles.messageText}>
          {is2020Challenge ? i18n.t( "seek_challenges.badge" ).split( " " )[0] : i18n.t( "challenges.op" )}
          {" - "}
          {formatMonthYear( availableDate )}
        </Text>
      </View>
      <View style={styles.startButton}>
        {rightIcon}
      </View>
    </TouchableOpacity>
  );
};

ChallengeProgressCard.defaultProps = {
  fetchChallenges: () => {}
};

export default ChallengeProgressCard;
