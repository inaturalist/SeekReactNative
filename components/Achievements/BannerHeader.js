// @flow

import React from "react";
import {
  ImageBackground,
  Text
} from "react-native";

import styles from "../../styles/badges/banner";
import icons from "../../assets/icons";

type Props = {
  text: string
}

const BannerHeader = ( { text }: Props ) => (
  <ImageBackground source={icons.titleBanner} style={styles.banner}>
    <Text style={styles.bannerText}>{text}</Text>
  </ImageBackground>
);

export default BannerHeader;
