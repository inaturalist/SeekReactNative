import React from "react";

import StyledText from "./StyledText";
import { baseTextStyles } from "../../styles/textStyles";
import { dimensions } from "../../styles/global";

interface Props {
  readonly text: string;
  readonly allowFontScaling?: boolean;
}

const DescriptionText = ( { text, allowFontScaling = true }: Props ) => (
  <StyledText
    allowFontScaling={allowFontScaling}
    style={dimensions.height > 570 ? baseTextStyles.body : baseTextStyles.bodyBlackSmallScreens}
  >
    {text}
  </StyledText>
);

export default DescriptionText;
