
// @flow

import React from "react";
import {
  Text,
  TouchableOpacity
} from "react-native";

import i18n from "../../../i18n";
import styles from "../../../styles/uiComponents/buttons/button";

type Props = {
  +color?: ?Object,
  +handlePress: Function,
  +large?: boolean,
  +greenText?: boolean,
  +text: string
}

const GreenButton = ( {
  color,
  handlePress,
  large,
  text,
  greenText
}: Props ) => (
  <TouchableOpacity
    onPress={() => handlePress()}
    style={[
      styles.button,
      large && styles.largeButton,
      large && styles.extraPadding,
      color && { backgroundColor: color }
    ]}
  >
    <Text style={[styles.buttonText, greenText && styles.greenText]}>
      {i18n.t( text ).toLocaleUpperCase()}
    </Text>
  </TouchableOpacity>
);

GreenButton.defaultProps = {
  large: false,
  greenText: false,
  color: null
};

export default GreenButton;
