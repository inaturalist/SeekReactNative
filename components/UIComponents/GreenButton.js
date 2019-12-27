
// @flow

import React from "react";
import {
  Text,
  TouchableOpacity
} from "react-native";

import styles from "../../styles/uiComponents/greenButton";

type Props = {
  +color?: ?Object,
  +handlePress: Function,
  +letterSpacing?: ?number,
  +text: string,
  +login?: boolean,
  +fontSize?: ?number
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
    onPress={() => handlePress()}
    style={[styles.greenButton, color && { backgroundColor: color }, login && styles.loginHeight]}
  >
    <Text style={[styles.buttonText, letterSpacing && { letterSpacing }, fontSize && { fontSize }]}>
      {text.toLocaleUpperCase()}
    </Text>
  </TouchableOpacity>
);

GreenButton.defaultProps = {
  fontSize: null,
  login: false,
  letterSpacing: null,
  color: null
};

export default GreenButton;
