
import React from "react";
import { TouchableOpacity } from "react-native";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/uiComponents/buttons/greenButton";
import StyledText from "../StyledText";
import { baseTextStyles } from "../../../styles/textStyles";

interface Props {
  color?: string;
  handlePress: () => void;
  letterSpacing?: number;
  text: string;
  login?: boolean;
  fontSize?: number;
  width?: number;
  allowFontScaling?: boolean;
  disabled?: boolean;
}

const GreenButton = ( {
  color,
  handlePress,
  letterSpacing,
  login,
  fontSize,
  text,
  width,
  allowFontScaling,
  disabled
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
      testID="greenButton"
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