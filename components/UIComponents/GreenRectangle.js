// @flow
import React from "react";
import { View, Text } from "react-native";

import styles from "../../styles/uiComponents/greenRectangle";

type Props = {
  text: string,
  color: ?string
};

const GreenRectangle = ( { text, color }: Props ) => (
  <View style={[styles.greenButton, color && { backgroundColor: color }]}>
    <Text style={styles.greenButtonText}>{text.toLocaleUpperCase()}</Text>
  </View>
);

export default GreenRectangle;
