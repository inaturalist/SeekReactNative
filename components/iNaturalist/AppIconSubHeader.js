// @flow

import * as React from "react";
import { View, Image } from "react-native";

import { viewStyles, textStyles, imageStyles } from "../../styles/iNaturalist/iNatStats";
import logos from "../../assets/logos";
import { AppOrientationContext } from "../UserContext";
import StyledText from "../UIComponents/StyledText";

type Props = {
  icon: string,
  text: string,
  largeIcon?: boolean
}

const AppIconSubHeader = ( { icon, text, largeIcon }: Props ): React.Node => {
  const { isTablet } = React.useContext( AppOrientationContext );

  return (
    <View style={[
      viewStyles.row,
      viewStyles.secondHeader,
      viewStyles.appIconSubHeader,
      isTablet && viewStyles.tabletContainer
    ]}>
      <Image
        source={icon === "inat" ? logos.iNatAppIcon : logos.seekAppIcon}
        style={largeIcon ? imageStyles.largeIcon : imageStyles.smallIcon}
      />
      <StyledText style={[
        textStyles.secondHeaderText,
        largeIcon && textStyles.smallerTextWidth,
        isTablet && viewStyles.tabletContainer,
        ( isTablet && largeIcon ) && viewStyles.landscapeContainerLargeIcon
      ]}>
        {text}
      </StyledText>
    </View>
  );
};

export default AppIconSubHeader;
