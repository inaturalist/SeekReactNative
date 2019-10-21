// @flow

import React from "react";
import { Text } from "react-native";

import styles from "../../styles/uiComponents/greenText";

type Props = {
  +text: string,
  +smaller: ?boolean,
  +center: ?boolean,
  +color: ?string
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
    {text}
  </Text>
);

export default GreenText;
