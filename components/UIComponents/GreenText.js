// @flow

import React from "react";
import { Text } from "react-native";

import styles from "../../styles/uiComponents/greenText";

type Props = {
  +text: string
}

const GreenText = ( { text }: Props ) => (
  <Text style={styles.greenHeaderText}>{text}</Text>
);

export default GreenText;
