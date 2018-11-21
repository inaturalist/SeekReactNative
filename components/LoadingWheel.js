// @flow

import React from "react";
import {
  View,
  ActivityIndicator
} from "react-native";

import styles from "../styles/challenges";

type Props = {
  color: string
}

const LoadingWheel = ( { color }: Props ) => (
  <View style={{ flexGrow: 1, justifyContent: "center" }}>
    <View style={styles.taxonGrid}>
      <ActivityIndicator color={color} size="large" />
    </View>
  </View>
);

export default LoadingWheel;
