import React from "react";
import {
  View,
  ActivityIndicator
} from "react-native";

import styles from "../styles/challenges";

const LoadingScreen = () => (
  <View style={styles.taxonGrid}>
    <View style={styles.loadingWheel}>
      <ActivityIndicator color="white" size="large" />
    </View>
  </View>
);

export default LoadingScreen;
