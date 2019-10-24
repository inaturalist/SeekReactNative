// @flow

import React from "react";
import { Text } from "react-native";

import styles from "../../styles/uiComponents/descriptionText";

type Props = {
  +text: string
}

const DescriptionText = ( { text }: Props ) => (
  <Text style={styles.text}>
    {text}
  </Text>
);

export default DescriptionText;
