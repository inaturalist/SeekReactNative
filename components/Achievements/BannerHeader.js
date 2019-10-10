// @flow

import React from "react";
import {
  ImageBackground,
  Text
} from "react-native";

import styles from "../../styles/badges/banner";
import icons from "../../assets/icons";

type Props = {
  +text: string,
  +modal: boolean
}

const BannerHeader = ( { text, modal }: Props ) => (
  <ImageBackground
    source={icons.titleBanner}
    style={[styles.banner, modal && { marginTop: 32, marginBottom: 26 }]}
  >
    <Text style={styles.bannerText}>{text}</Text>
  </ImageBackground>
);

export default BannerHeader;
