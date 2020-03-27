// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import { withNavigation } from "@react-navigation/compat";
import { isAfter } from "date-fns";

import i18n from "../../i18n";
import styles from "../../styles/challenges/challenges";
import PercentCircle from "../UIComponents/PercentCircle";
import { startChallenge, recalculateChallenges, setChallengeIndex } from "../../utility/challengeHelpers";
import { setRoute } from "../../utility/helpers";
import icons from "../../assets/icons";
import { formatMonthYear } from "../../utility/dateHelpers";
import badges from "../../assets/badges";

type Props = {
  +navigation: any,
  +challenge: Object,
  +fetchChallenges?: Function
}

const ChallengeProgressCard = ( { navigation, challenge, fetchChallenges }: Props ) => {
  const is2020Challenge = challenge && isAfter( challenge.availableDate, new Date( 2020, 2, 1 ) );

  let rightIcon;

  let leftIcon;

  if ( challenge.startedDate && challenge.percentComplete === 100 ) {
    leftIcon = badges[challenge.earnedIconName];
  } else {
    leftIcon = badges.badge_empty;
  }

  if ( challenge.percentComplete === 100 ) {
    rightIcon = (
      <View style={styles.startButton}>
        <Image source={icons.completed} />
      </View>
    );
  } else if ( challenge.startedDate && challenge.percentComplete !== 100 ) {
    rightIcon = (
      <View style={styles.startButton}>
        <PercentCircle challenge={challenge} />
      </View>
    );
  } else if ( fetchChallenges ) {
    rightIcon = (
      <TouchableOpacity
        accessibilityLabel={`${i18n.t( "challenges.start_now" )}${challenge.name}`}
        accessible
        onPress={() => {
          setChallengeIndex( challenge.index );
          setRoute( "Challenges" );
          startChallenge( challenge.index );
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
        setChallengeIndex( challenge.index );
        setRoute( "Challenges" );
        navigation.navigate( "ChallengeDetails" );
      }}
      style={[styles.card, styles.row]}
    >
      <Image source={leftIcon} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {i18n.t( challenge.name ).toLocaleUpperCase()}
        </Text>
        <Text style={styles.messageText}>
          {is2020Challenge ? i18n.t( "seek_challenges.badge" ).split( " " )[0] : i18n.t( "challenges.op" )}
          {" - "}
          {formatMonthYear( challenge.availableDate )}
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
