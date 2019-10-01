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
  +route: string
}

const CustomBackArrow = ( { navigation, route }: Props ) => (
  <TouchableOpacity
    hitSlop={styles.touchable}
    onPress={() => navigation.navigate( route )}
    style={styles.backButton}
  >
    <Image source={icons.backButton} />
  </TouchableOpacity>
);

export default CustomBackArrow;
