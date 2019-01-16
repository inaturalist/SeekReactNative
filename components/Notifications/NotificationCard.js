// @flow

import React from "react";
import {
  Text,
  Image,
  View
} from "react-native";

import styles from "../../styles/notifications";

type Props = {
  navigation: any,
  item: Object
}

const NotificationCard = ( { navigation, item }: Props ) => (
  <View style={styles.cardContainer}>
    <View style={styles.card}>
      <Image style={styles.image} source={item.iconName} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {item.title}
        </Text>
        <Text style={styles.messageText}>
          {item.message}
        </Text>
      </View>
    </View>
    <View style={styles.divider} />
  </View>
);

export default NotificationCard;
