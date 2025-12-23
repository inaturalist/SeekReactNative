import React from "react";
import type { TextProps } from "react-native";
import { Text } from "react-native";

import { leftText } from "../../styles/global";

const StyledText = ( props: TextProps ) => {
  const { children } = props;
  return (
    <Text
      {...props}
      style={[leftText, props.style]}
    >
      { children }
    </Text>
  );
};

export default StyledText;
