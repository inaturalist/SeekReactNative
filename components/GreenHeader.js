// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image
} from "react-native";

import styles from "../styles/greenHeader";
import icons from "../assets/icons";

type Props = {
  header: string,
  navigation: any
}

const GreenHeader = ( { header, navigation }: Props ) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}
    >
      <Image
        source={icons.backButton}
        style={styles.image}
      />
    </TouchableOpacity>
    <View style={styles.textContainer}>
      <Text style={styles.text}>{header}</Text>
    </View>
    <View />
  </View>
);

export default GreenHeader;
