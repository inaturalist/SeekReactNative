
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
  +text: string
}

const GreenButton = ( {
  color,
  handlePress,
  letterSpacing,
  text
}: Props ) => (
  <TouchableOpacity
    onPress={() => handlePress()}
    style={[styles.greenButton, color && { backgroundColor: color }]}
  >
    <Text style={[styles.buttonText, letterSpacing && { letterSpacing }]}>
      {text}
    </Text>
  </TouchableOpacity>
);

export default GreenButton;
