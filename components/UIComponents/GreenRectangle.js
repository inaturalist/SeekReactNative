// @flow
import * as React from "react";
import { View } from "react-native";

import { viewStyles, textStyles } from "../../styles/uiComponents/greenRectangle";
import StyledText from "./StyledText";

type Props = {
  text: string,
  color: ?string,
  letterSpacing: number,
  textColor?: ?string
};

const GreenRectangle = ( { text, color, letterSpacing, textColor }: Props ): React.Node => (
  <View style={[
    viewStyles.greenButton,
    color && { backgroundColor: color }
  ]}>
    <StyledText style={[
      textStyles.greenButtonText,
      { letterSpacing },
      textColor && { color: textColor }
    ]}>
      {text.toLocaleUpperCase()}
    </StyledText>
  </View>
);

GreenRectangle.defaultProps = {
  letterSpacing: 0.89
};

export default GreenRectangle;
