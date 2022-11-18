// @flow

import * as React from "react";
import { ImageBackground } from "react-native";

import { viewStyles, textStyles } from "../../styles/badges/banner";
import icons from "../../assets/icons";
import StyledText from "./StyledText";

type Props = {
  +text: string,
  +modal?: boolean
}

const BannerHeader = ( { text, modal }: Props ): React.Node => (
  <ImageBackground
    source={icons.titleBanner}
    style={[viewStyles.banner, modal && viewStyles.modal]}
  >
    <StyledText allowFontScaling={false} style={textStyles.bannerText}>{text}</StyledText>
  </ImageBackground>
);

BannerHeader.defaultProps = {
  modal: false
};

export default BannerHeader;
