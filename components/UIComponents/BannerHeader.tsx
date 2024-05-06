import React from "react";
import { ImageBackground } from "react-native";

import { viewStyles, textStyles } from "../../styles/badges/banner";
import icons from "../../assets/icons";
import StyledText from "./StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  readonly text: string;
  readonly modal?: boolean;
}

const BannerHeader = ( { text, modal }: Props ) => (
  <ImageBackground
    source={icons.titleBanner}
    style={[viewStyles.banner, modal && viewStyles.modal]}
  >
    <StyledText
      allowFontScaling={false}
      style={[baseTextStyles.banner, textStyles.bannerText]}
    >
      {text}
    </StyledText>
  </ImageBackground>
);

BannerHeader.defaultProps = {
  modal: false
};

export default BannerHeader;
