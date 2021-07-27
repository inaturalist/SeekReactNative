// @flow
import * as React from "react";
import { View, Text } from "react-native";

import { viewStyles, textStyles } from "../../styles/uiComponents/greenRectangle";

type Props = {
  text: string,
  color: ?string,
  letterSpacing: number,
  textColor?: ?string
};

const GreenRectangle = ( { text, color, letterSpacing, textColor }: Props ): React.Node => (
  <View style={[
    viewStyles.greenButton,
    color && { backgroundColor: color }
  ]}>
    <Text style={[
      textStyles.greenButtonText,
      { letterSpacing },
      { color: textColor }
    ]}>
      {text.toLocaleUpperCase()}
    </Text>
  </View>
);

GreenRectangle.defaultProps = {
  letterSpacing: 0.89
};

export default GreenRectangle;
