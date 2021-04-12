// @flow

import * as React from "react";
import { Text } from "react-native";

import styles from "../../styles/uiComponents/greenText";
import i18n from "../../i18n";

type Props = {
  +text: string,
  +smaller?: boolean,
  +center?: boolean,
  +color?: ?string,
  +allowFontScaling?: boolean
}

const GreenText = ( {
  smaller,
  text,
  center,
  color,
  allowFontScaling
}: Props ): React.Node => (
  <Text
    style={[
      styles.greenHeaderText,
      smaller && styles.smallerText,
      center && styles.center,
      color && { color }
    ]}
    allowFontScaling={allowFontScaling}
  >
    {i18n.t( text ).toLocaleUpperCase()}
  </Text>
);

GreenText.defaultProps = {
  color: null,
  center: false,
  smaller: false,
  allowFontScaling: true
};

export default GreenText;
