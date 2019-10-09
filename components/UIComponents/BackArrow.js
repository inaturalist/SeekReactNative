// @flow

import React from "react";
import {
  TouchableOpacity,
  Image
} from "react-native";

import styles from "../../styles/uiComponents/backArrow";
import icons from "../../assets/icons";

type Props = {
  +navigation: any,
  +green: ?boolean
}

const BackArrow = ( { navigation, green }: Props ) => (
  <TouchableOpacity
    hitSlop={styles.touchable}
    onPress={() => navigation.goBack()}
    style={styles.backButton}
  >
    <Image source={green ? icons.backButtonGreen : icons.backButton} />
  </TouchableOpacity>
);

export default BackArrow;
