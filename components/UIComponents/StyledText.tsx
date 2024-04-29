import React from "react";
import { Text } from "react-native";

import { leftText } from "../../styles/global";

interface Props {
  children: React.ReactNode;
  style?: object;
  allowFontScaling?: boolean;
}

const StyledText = ( props: Props ) => {
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
