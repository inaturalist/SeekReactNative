// @flow
import * as React from "react";
import { View, Text } from "react-native";

import styles from "../../styles/uiComponents/greenRectangle";

type Props = {
  text: string,
  color: ?string,
  letterSpacing: number
};

const GreenRectangle = ( { text, color, letterSpacing }: Props ): React.Node => (
  <View style={[
    styles.greenButton,
    color && { backgroundColor: color }
  ]}>
    <Text style={[
      styles.greenButtonText,
      { letterSpacing }
    ]}>
      {text.toLocaleUpperCase()}
    </Text>
  </View>
);

GreenRectangle.defaultProps = {
  letterSpacing: 0.89
};

export default GreenRectangle;
