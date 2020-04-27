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
  +modal?: boolean
}

const BannerHeader = ( { text, modal }: Props ) => (
  <ImageBackground
    source={icons.titleBanner}
    style={[styles.banner, modal && styles.modal]}
  >
    <Text allowFontScaling={false} style={styles.bannerText}>{text}</Text>
  </ImageBackground>
);

BannerHeader.defaultProps = {
  modal: false
};

export default BannerHeader;
