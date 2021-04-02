// @flow

import * as React from "react";
import { Text } from "react-native";

import styles from "../../styles/uiComponents/descriptionText";

type Props = {
  +text: string,
  +allowFontScaling?: boolean
}

const DescriptionText = ( { text, allowFontScaling }: Props ): React.Node => (
  <Text allowFontScaling={allowFontScaling} style={styles.text}>
    {text}
  </Text>
);

DescriptionText.defaultProps = {
  allowFontScaling: true
};

export default DescriptionText;
