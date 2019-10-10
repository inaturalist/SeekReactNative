// @flow

import React from "react";
import { Text } from "react-native";

import styles from "../../styles/uiComponents/descriptionText";

type Props = {
  +text: string,
  +center: ?boolean,
  +color: ?string
}

const GreenText = ( {
  text,
  center,
  color
}: Props ) => (
  <Text style={[
    styles.text,
    center && styles.center,
    color && { color }
  ]}
  >
    {text}
  </Text>
);

export default GreenText;
