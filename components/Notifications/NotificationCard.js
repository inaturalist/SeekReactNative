// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";

import i18n from "../../i18n";
import styles from "../../styles/notifications";
import notifications from "../../assets/notifications";
import { setChallengeIndex } from "../../utility/challengeHelpers";

type Props = {
  navigation: any,
  item: Object
}

const NotificationCard = ( { navigation, item }: Props ) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if ( item.nextScreen === "ChallengeDetails" ) {
          setChallengeIndex( item.challengeIndex );
        }
        navigation.navigate( item.nextScreen );
      }}
    >
      <Image style={styles.image} source={notifications[item.iconName]} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {i18n.t( item.title )}
        </Text>
        <Text style={styles.messageText}>
          {i18n.t( item.message )}
        </Text>
      </View>
      {item.seen === false ? <View style={styles.greenDot} /> : null}
    </TouchableOpacity>
    <View style={styles.divider} />
  </View>
);

export default NotificationCard;
