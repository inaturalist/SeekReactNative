
// @flow

import React from "react";
import {
  Text,
  TouchableOpacity
} from "react-native";

import styles from "../../styles/uiComponents/greenButton";

type Props = {
  +handlePress: Function,
  +letterSpacing: ?Number,
  +text: string
}

const GreenButton = ( { handlePress, letterSpacing, text }: Props ) => (
  <TouchableOpacity
    onPress={() => handlePress()}
    style={styles.greenButton}
  >
    <Text style={[styles.buttonText, letterSpacing && { letterSpacing }]}>
      {text}
    </Text>
  </TouchableOpacity>
);

export default GreenButton;
