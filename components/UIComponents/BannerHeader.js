// @flow

import * as React from "react";
import { ImageBackground, Text } from "react-native";

import { viewStyles, textStyles } from "../../styles/badges/banner";
import icons from "../../assets/icons";

type Props = {
  +text: string,
  +modal?: boolean
}

const BannerHeader = ( { text, modal }: Props ): React.Node => (
  <ImageBackground
    source={icons.titleBanner}
    style={[viewStyles.banner, modal && viewStyles.modal]}
  >
    <Text allowFontScaling={false} style={textStyles.bannerText}>{text}</Text>
  </ImageBackground>
);

BannerHeader.defaultProps = {
  modal: false
};

export default BannerHeader;
