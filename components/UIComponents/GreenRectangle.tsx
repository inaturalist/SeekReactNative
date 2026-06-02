import * as React from "react";
import { View } from "react-native";

import { baseTextStyles } from "../../styles/textStyles";
import { textStyles, viewStyles } from "../../styles/uiComponents/greenRectangle";
import StyledText from "./StyledText";

interface Props {
  text: string;
  color: string | null;
  letterSpacing?: number;
  textColor?: string | null;
}

const GreenRectangle = ( { text, color, letterSpacing, textColor }: Props ) => (
  <View style={[
    viewStyles.greenButton,
    color ? { backgroundColor: color } : {},
  ]}>
    <StyledText style={[
      baseTextStyles.challengeItemTitleWhite,
      textStyles.greenButtonText,
      letterSpacing && { letterSpacing },
      textColor && { color: textColor },
    ]}>
      {text.toLocaleUpperCase()}
    </StyledText>
  </View>
);

export default GreenRectangle;
