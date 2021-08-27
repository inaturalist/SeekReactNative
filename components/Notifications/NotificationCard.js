// @flow

import * as React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import { viewStyles, textStyles, imageStyles } from "../../styles/notifications";
import notifications from "../../assets/notifications";
import challengesDict from "../../utility/dictionaries/challengesDict";
import badges from "../../assets/badges";
import { markNotificationAsSeen } from "../../utility/notificationHelpers";
import { ChallengeContext } from "../UserContext";

type Props = {
  +item: Object
}

const NotificationCard = ( { item }: Props ): React.Node => {
  const { setIndex } = React.useContext( ChallengeContext );
  const navigation = useNavigation();

  let image = notifications[item.iconName];

  if ( item.title === "notifications.challenge_completed" ) {
    const challenges = Object.keys( challengesDict ).map( challenge => challengesDict[challenge] );
    const completed = challenges[item.challengeIndex];
    image = completed && badges[completed.earnedIconName];
  }

  const goToNotification = () => {
    if ( item.nextScreen === "ChallengeDetails" ) {
      setIndex( item.challengeIndex );
    }
    if ( item.seen === false ) {
      markNotificationAsSeen( item.index );
    }
    navigation.navigate( item.nextScreen );
  };

  return (
    <TouchableOpacity
      onPress={goToNotification}
      style={[viewStyles.card, viewStyles.row]}
    >
      <Image source={image} style={imageStyles.image} />
      <View style={viewStyles.textContainer}>
        <Text style={textStyles.titleText}>
          {i18n.t( item.title )}
        </Text>
        <Text style={textStyles.messageText}>
          {i18n.t( item.message )}
        </Text>
      </View>
      {!item.seen && <View style={viewStyles.greenDot} />}
    </TouchableOpacity>
  );
};

export default NotificationCard;
