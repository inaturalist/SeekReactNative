// @flow
import React from "react";
import { View, Text } from "react-native";

import styles from "../styles/banner";

type Props = {
  bannerText: string,
  main: boolean
}

const Banner = ( { bannerText, main }: Props ) => (
  <View style={[styles.background, main && styles.mainBackground]}>
    <Text style={styles.text}>{bannerText}</Text>
  </View>
);

export default Banner;
