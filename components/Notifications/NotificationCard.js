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
import icons from "../../assets/icons";

type Props = {
  navigation: any,
  item: Object
}

const NotificationCard = ( { navigation, item }: Props ) => {
  let index;

  if ( item.nextScreen === "ChallengeDetails" ) {
    index = item.challengeIndex;
  } else {
    index = null;
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate( item.nextScreen, { index } )}
      >
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={icons[item.iconName]} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            {i18n.t( item.title )}
          </Text>
          <Text style={styles.messageText}>
            {i18n.t( item.message )}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
    </View>
  );
};

export default NotificationCard;
