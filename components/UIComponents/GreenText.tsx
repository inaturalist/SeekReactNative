import React from "react";

import styles from "../../styles/uiComponents/greenText";
import i18n from "../../i18n";
import StyledText from "./StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  readonly style?: Object;
  readonly text: string;
  readonly small?: boolean;
  readonly smaller?: boolean;
  readonly center?: boolean;
  readonly color?: string | null;
  readonly allowFontScaling?: boolean;
  readonly noTranslation?: boolean;
}

const GreenText = ( {
  style,
  small = false,
  smaller = false,
  text,
  center = false,
  color = null,
  allowFontScaling = true,
  noTranslation
}: Props ) => (
  <StyledText
    style={[
      baseTextStyles.header,
      small && baseTextStyles.emptyStateGreen,
      smaller && baseTextStyles.highlight,
      center && styles.center,
      color && { color },
      style
    ]}
    allowFontScaling={allowFontScaling}
  >
    {noTranslation ? text : i18n.t( text ).toLocaleUpperCase()}
  </StyledText>
);

export default GreenText;
