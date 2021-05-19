
// @flow

import * as React from "react";
import { Text, TouchableOpacity } from "react-native";

import i18n from "../../../i18n";
import { viewStyles, textStyles } from "../../../styles/uiComponents/buttons/greenButton";

type Props = {
  +color?: ?Object,
  +handlePress: Function,
  +letterSpacing?: number,
  +text: string,
  +login?: boolean,
  +fontSize?: number,
  +width?: ?number,
  +allowFontScaling?: boolean,
  +disabled?: boolean
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
}: Props ): React.Node => {
  let widthStyle = null;

  if ( width ) {
    widthStyle = { width };
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        viewStyles.greenButton, color
        && { backgroundColor: color },
        login && viewStyles.loginHeight,
        widthStyle
      ]}
      disabled={disabled}
      testID="greenButton"
    >
      <Text
        style={[textStyles.buttonText, { letterSpacing }, { fontSize }]}
        allowFontScaling={allowFontScaling}
      >
        {i18n.t( text ).toLocaleUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

GreenButton.defaultProps = {
  fontSize: 18,
  login: false,
  letterSpacing: 1.0,
  color: null,
  width: null,
  allowFontScaling: true
};

export default GreenButton;
