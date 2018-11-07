import React from "react";
import {
  View,
  ActivityIndicator
} from "react-native";

import styles from "../styles/challenges";

const LoadingWheel = () => (
  <View style={{ flexGrow: 1, justifyContent: "center" }}>
    <View style={styles.taxonGrid}>
      <ActivityIndicator color="white" size="large" />
    </View>
  </View>
);

export default LoadingWheel;
