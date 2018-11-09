// @flow
import React from "react";
import { View, Text } from "react-native";

import styles from "../styles/banner";

type Props = {
  bannerText: string
}

const Banner = ( { bannerText }: Props ) => (
  <View style={styles.background}>
    <Text style={styles.text}>{bannerText}</Text>
  </View>
);

export default Banner;
