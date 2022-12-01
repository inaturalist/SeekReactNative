// @flow

import * as React from "react";

import styles from "../../styles/uiComponents/greenText";
import i18n from "../../i18n";
import StyledText from "./StyledText";


type Props = {
  +text: string,
  +smaller?: boolean,
  +center?: boolean,
  +color?: ?string,
  +allowFontScaling?: boolean
}

const GreenText = ( {
  style,
  smaller,
  text,
  center,
  color,
  allowFontScaling,
  noTranslation
}: Props ): React.Node => (
  <StyledText
    style={[
      styles.greenHeaderText,
      smaller && styles.smallerText,
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
