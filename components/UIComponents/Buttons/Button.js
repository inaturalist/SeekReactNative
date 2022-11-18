
// @flow

import * as React from "react";
import {
  TouchableOpacity
} from "react-native";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/uiComponents/buttons/button";
import StyledText from "../StyledText";

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
      viewStyles.button,
      viewStyles.center,
      large && viewStyles.largeButton,
      large && viewStyles.extraPadding,
      color && { backgroundColor: color },
      login && viewStyles.login
    ]}
  >
    <StyledText style={[textStyles.buttonText, greenText && textStyles.greenText]}>
      {i18n.t( text ).toLocaleUpperCase()}
    </StyledText>
  </TouchableOpacity>
);

Button.defaultProps = {
  large: false,
  greenText: false,
  color: null,
  login: false
};

export default Button;
