import React from "react";
import { Text } from "react-native";

import { leftText } from "../../styles/global";

interface Props {
  testID?: string;
  children: React.ReactNode;
  style?: object;
  allowFontScaling?: boolean;
  numberOfLines?: number;
  onPress?: ( ) => void;
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
