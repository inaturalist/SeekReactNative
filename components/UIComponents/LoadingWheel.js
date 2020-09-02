// @flow

import React from "react";
import { ActivityIndicator, View } from "react-native";

import styles from "../../styles/uiComponents/loadingWheel";

type Props = {
  +color?: ?string
}

const LoadingWheel = ( { color }: Props ) => (
  <View style={styles.container}>
    <ActivityIndicator color={color} size="large" />
  </View>
);

LoadingWheel.defaultProps = {
  color: null
};

export default LoadingWheel;
