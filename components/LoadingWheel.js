// @flow

import React from "react";
import {
  View,
  ActivityIndicator
} from "react-native";

type Props = {
  color: string
}

const LoadingWheel = ( { color }: Props ) => (
  <View style={{ flexGrow: 1, justifyContent: "center" }}>
    <ActivityIndicator color={color} size="large" />
  </View>
);

export default LoadingWheel;
