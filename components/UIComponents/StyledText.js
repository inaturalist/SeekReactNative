import React from "react";
import { Text } from "react-native";

import { startAlign } from "../../styles/global";

const StyledText = props => {
  const { children } = props;
  return (
    <Text
      {...props}
      style={[startAlign, props.style]}
    >
      { children }
    </Text>
  );
};

export default StyledText;
