// @flow
import React from "react";
import { View, Text } from "react-native";

import styles from "../../styles/uiComponents/greenRectangle";

type Props = {
  text: string,
  color: ?string,
  letterSpacing: ?number
};

const GreenRectangle = ( { text, color, letterSpacing }: Props ) => (
  <View style={[
    styles.greenButton,
    color && { backgroundColor: color },
    letterSpacing && { letterSpacing }
  ]}>
    <Text style={styles.greenButtonText}>{text.toLocaleUpperCase()}</Text>
  </View>
);

export default GreenRectangle;
