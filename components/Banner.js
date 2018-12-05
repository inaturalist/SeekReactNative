// @flow
import React from "react";
import { View, Image, Text } from "react-native";

import styles from "../styles/banner";

type Props = {
  bannerText: string,
  main: boolean
}

const Banner = ( { bannerText, main }: Props ) => (
  <View style={styles.banner}>
    <Image
      source={require( "../../assets/results/icn-results-match.png" )}
      style={[styles.speciesBannerImage, main && styles.mainBannerImage]}
    />
    <View style={[styles.background, main && styles.mainBackground]}>
      <Text style={styles.text}>{bannerText}</Text>
    </View>
  </View>
);

export default Banner;
