import React from "react";
import { Text } from "react-native";

import { leftText } from "../../styles/global";

const StyledText = props => {
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
