import * as React from "react";
import {
  TouchableOpacity
} from "react-native";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/uiComponents/buttons/button";
import StyledText from "../StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

interface Props extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  readonly color?: string | null;
  readonly handlePress: () => void;
  readonly large?: boolean;
  readonly greenText?: boolean;
  readonly text: string;
  readonly login?: boolean;
}

const Button = ( {
  testID,
  color = null,
  handlePress,
  large = false,
  text,
  greenText = false,
  login = false
}: Props ) => (
  <TouchableOpacity
    testID={testID || "button"}
    onPress={() => handlePress()}
    style={[
      viewStyles.button,
      viewStyles.center,
      large && viewStyles.largeButton,
      large && viewStyles.extraPadding,
      !!color && { backgroundColor: color },
      login && viewStyles.login
    ]}
  >
    <StyledText style={[greenText ? baseTextStyles.buttonGreen : baseTextStyles.button, textStyles.buttonText]}>
      {i18n.t( text ).toLocaleUpperCase()}
    </StyledText>
  </TouchableOpacity>
);

export default Button;
