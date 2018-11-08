import React from "react";
import { View, Text } from "react-native";

import styles from "../styles/banner";

const Banner = () => (
  <View style={styles.background}>
    <Text style={styles.text}>Collected X on X date</Text>
  </View>
);

export default Banner;
