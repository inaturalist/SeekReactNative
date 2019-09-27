// @flow

import React from "react";
import { ActivityIndicator } from "react-native";

type Props = {
  color: string
}

const LoadingWheel = ( { color }: Props ) => <ActivityIndicator color={color} size="large" />;

export default LoadingWheel;
