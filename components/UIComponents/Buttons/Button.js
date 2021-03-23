
// @flow

import * as React from "react";
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
  +text: string,
  +login?: boolean
}

const Button = ( {
  color,
  handlePress,
  large,
  text,
  greenText,
  login
}: Props ): React.Node => (
  <TouchableOpacity
    onPress={() => handlePress()}
    style={[
      styles.button,
      styles.center,
      large && styles.largeButton,
      large && styles.extraPadding,
      color && { backgroundColor: color },
      login && styles.login
    ]}
  >
    <Text style={[styles.buttonText, greenText && styles.greenText]}>
      {i18n.t( text ).toLocaleUpperCase()}
    </Text>
  </TouchableOpacity>
);

Button.defaultProps = {
  large: false,
  greenText: false,
  color: null,
  login: false
};

export default Button;
