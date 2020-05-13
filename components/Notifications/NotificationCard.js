// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import styles from "../../styles/notifications";
import notifications from "../../assets/notifications";
import { setChallengeIndex } from "../../utility/challengeHelpers";
import challengesDict from "../../utility/dictionaries/challengesDict";
import badges from "../../assets/badges";
import { markNotificationAsSeen } from "../../utility/notificationHelpers";

type Props = {
  +item: Object
}

const NotificationCard = ( { item }: Props ) => {
  const navigation = useNavigation();

  let image;

  if ( item.title === "notifications.challenge_completed" ) {
    const challenges = Object.keys( challengesDict ).map( challenge => challengesDict[challenge] );

    const challengeCompleted = challenges.find( c => c.index === item.challengeIndex );
    const { earnedIconName } = challengeCompleted;

    image = badges[earnedIconName];
  } else {
    image = notifications[item.iconName];
  }

  return (
    <TouchableOpacity
      onPress={() => {
        if ( item.nextScreen === "ChallengeDetails" ) {
          setChallengeIndex( item.challengeIndex );
        }
        if ( item.seen === false ) {
          markNotificationAsSeen( item.index );
        }
        navigation.navigate( item.nextScreen );
      }}
      style={[styles.card, styles.row]}
    >
      <Image source={image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {i18n.t( item.title )}
        </Text>
        <Text style={styles.messageText}>
          {i18n.t( item.message )}
        </Text>
      </View>
      {!item.seen && <View style={styles.greenDot} />}
    </TouchableOpacity>
  );
};

export default NotificationCard;
