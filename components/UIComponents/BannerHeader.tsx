import React from "react";
import { ImageBackground } from "react-native";

import icons from "../../assets/icons";
import { textStyles, viewStyles } from "../../styles/badges/banner";
import { baseTextStyles } from "../../styles/textStyles";
import StyledText from "./StyledText";

interface Props {
  readonly text: string;
  readonly modal?: boolean;
}

const BannerHeader = ( { text, modal = false }: Props ) => (
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

export default BannerHeader;
