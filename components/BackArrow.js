// @flow

import React from "react";
import {
  TouchableOpacity,
  Image
} from "react-native";

import styles from "../styles/backArrow";
import icons from "../assets/icons";

type Props = {
  navigation: any
}

const BackArrow = ( { navigation }: Props ) => (
  <TouchableOpacity
    hitSlop={styles.touchable}
    style={styles.backButton}
    onPress={() => navigation.goBack()}
  >
    <Image source={icons.backButton} />
  </TouchableOpacity>
);

export default BackArrow;
