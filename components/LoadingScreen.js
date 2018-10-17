import React from "react";
import {
  View,
  ActivityIndicator
} from "react-native";

import styles from "../styles/challenges";

const LoadingScreen = () => (
  <View style={styles.taxonGrid}>
    <ActivityIndicator color="white" size="large" />
  </View>
);

export default LoadingScreen;
