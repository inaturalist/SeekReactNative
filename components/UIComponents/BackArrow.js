// @flow

import React from "react";
import {
  TouchableOpacity,
  Image
} from "react-native";

import styles from "../../styles/uiComponents/backArrow";
import icons from "../../assets/icons";

type Props = {
  +navigation: any
}

const BackArrow = ( { navigation }: Props ) => (
  <TouchableOpacity
    hitSlop={styles.touchable}
    onPress={() => navigation.goBack()}
    style={styles.backButton}
  >
    <Image source={icons.backButton} />
  </TouchableOpacity>
);

export default BackArrow;
