import * as React from "react";
import {
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import i18n from "../../i18n";
import { viewStyles, textStyles, imageStyles } from "../../styles/notifications";
import notifications from "../../assets/notifications";
import challengesDict from "../../utility/dictionaries/challengesDict";
import badges from "../../assets/badges";
import { markNotificationAsSeen } from "../../utility/notificationHelpers";
import StyledText from "../UIComponents/StyledText";
import { useChallenge } from "../Providers/ChallengeProvider";
import { baseTextStyles } from "../../styles/textStyles";
import { Notification } from "./hooks/notificationHooks";

interface Props {
  readonly item: Notification;
}

const NotificationCard = ( { item }: Props ) => {
  const { setIndex } = useChallenge( );
  const navigation = useNavigation();

  let image: ImageSourcePropType = notifications[item.iconName];

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
    // TODO: navigation TS
    navigation.navigate( item.nextScreen );
  };

  return (
    <TouchableOpacity
      onPress={goToNotification}
      style={[viewStyles.card, viewStyles.row]}
    >
      <Image source={image} style={imageStyles.image} />
      <View style={viewStyles.textContainer}>
        <StyledText style={[baseTextStyles.bodyMedium, textStyles.titleText]}>
          {i18n.t( item.title )}
        </StyledText>
        <StyledText style={baseTextStyles.bodySmall}>
          {i18n.t( item.message )}
        </StyledText>
      </View>
      {!item.seen && <View style={viewStyles.greenDot} />}
    </TouchableOpacity>
  );
};

export default NotificationCard;
