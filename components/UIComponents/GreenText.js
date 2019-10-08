// @flow

import React from "react";
import { Text } from "react-native";

import styles from "../../styles/uiComponents/greenText";

type Props = {
  +text: string,
  +smaller: ?boolean
}

const GreenText = ( { smaller, text }: Props ) => (
  <Text style={[styles.greenHeaderText, smaller && styles.smallerText]}>{text}</Text>
);

export default GreenText;
