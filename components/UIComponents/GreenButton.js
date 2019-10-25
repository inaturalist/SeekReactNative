
// @flow

import React from "react";
import {
  Text,
  TouchableOpacity
} from "react-native";

import styles from "../../styles/uiComponents/greenButton";

type Props = {
  +color: ?Object,
  +handlePress: Function,
  +letterSpacing: ?Number,
  +text: string,
  +login: ?boolean,
  +fontSize: ?boolean
}

const GreenButton = ( {
  color,
  handlePress,
  letterSpacing,
  login,
  fontSize,
  text
}: Props ) => (
  <TouchableOpacity
    hitSlop={styles.touchable}
    onPress={() => handlePress()}
    style={[styles.greenButton, color && { backgroundColor: color }, login && styles.loginHeight]}
  >
    <Text style={[styles.buttonText, letterSpacing && { letterSpacing }, fontSize && { fontSize }]}>
      {text}
    </Text>
  </TouchableOpacity>
);

export default GreenButton;
