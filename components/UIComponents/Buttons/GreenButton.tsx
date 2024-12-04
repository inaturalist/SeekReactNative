
import React, { ComponentPropsWithoutRef } from "react";
import { TouchableOpacity } from "react-native";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/uiComponents/buttons/greenButton";
import StyledText from "../StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

interface Props extends ComponentPropsWithoutRef<typeof TouchableOpacity> {
  readonly color?: string | null;
  readonly handlePress: () => void;
  readonly letterSpacing?: number;
  readonly text: string;
  readonly login?: boolean;
  readonly fontSize?: number;
  readonly width?: number | null;
  readonly allowFontScaling?: boolean;
}

const GreenButton = ( {
  color,
  disabled,
  testID,
  handlePress,
  letterSpacing,
  login,
  fontSize,
  text,
  width,
  allowFontScaling
}: Props ) => {
  let widthStyle = null;

  if ( width ) {
    widthStyle = { width };
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        viewStyles.greenButton,
        color ? { backgroundColor: color } : {},
        login && viewStyles.loginHeight,
        widthStyle
      ]}
      disabled={disabled}
      testID={testID || "greenButton"}
    >
      <StyledText
        style={[
          baseTextStyles.button,
          textStyles.buttonText,
          letterSpacing && { letterSpacing },
          fontSize && { fontSize }
        ]}
        allowFontScaling={allowFontScaling}
      >
        {i18n.t( text ).toLocaleUpperCase()}
      </StyledText>
    </TouchableOpacity>
  );
};

GreenButton.defaultProps = {
  login: false,
  color: null,
  width: null,
  allowFontScaling: true
};

export default GreenButton;
