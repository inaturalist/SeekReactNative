import React from "react";

import styles from "../../styles/uiComponents/greenText";
import i18n from "../../i18n";
import StyledText from "./StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  style?: object;
  text: string;
  smaller?: boolean;
  center?: boolean;
  color?: string;
  allowFontScaling?: boolean;
  noTranslation?: boolean;
}

const GreenText = ( {
  style,
  smaller,
  text,
  center,
  color,
  allowFontScaling,
  noTranslation
}: Props ) => (
  <StyledText
    style={[
      baseTextStyles.headerGreen,
      // TODO: for some, e.g. YIR screen, this should be emptyStateGreen
      smaller && baseTextStyles.highlightGreen,
      center && styles.center,
      color && { color },
      style
    ]}
    allowFontScaling={allowFontScaling}
  >
    {noTranslation ? text : i18n.t( text ).toLocaleUpperCase()}
  </StyledText>
);

GreenText.defaultProps = {
  color: null,
  center: false,
  smaller: false,
  allowFontScaling: true
};

export default GreenText;
