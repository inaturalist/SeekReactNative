// @flow

import React from "react";
import { ActivityIndicator, View } from "react-native";

type Props = {
  +color: string
}

const LoadingWheel = ( { color }: Props ) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <ActivityIndicator color={color} size="large" />
  </View>
);

export default LoadingWheel;
