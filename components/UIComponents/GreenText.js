// @flow

import React from "react";
import { Text } from "react-native";

import styles from "../../styles/uiComponents/greenText";
import i18n from "../../i18n";

type Props = {
  +text: string,
  +smaller?: boolean,
  +center?: boolean,
  +color?: ?string
}

const GreenText = ( {
  smaller,
  text,
  center,
  color
}: Props ) => (
  <Text style={[
    styles.greenHeaderText,
    smaller && styles.smallerText,
    center && styles.center,
    color && { color }
  ]}
  >
    {i18n.t( text ).toLocaleUpperCase()}
  </Text>
);

GreenText.defaultProps = {
  color: null,
  center: false,
  smaller: false
};

export default GreenText;
