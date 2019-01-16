// @flow

import React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View
} from "react-native";

import styles from "../../styles/notifications";

type Props = {
  navigation: any,
  item: Object
}

const NotificationCard = ( { navigation, item }: Props ) => (
  <View style={styles.cardContainer}>
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate( item.nextScreen )}
    >
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={item.iconName} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>
          {item.title}
        </Text>
        <Text style={styles.messageText}>
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
    <View style={styles.divider} />
  </View>
);

export default NotificationCard;
