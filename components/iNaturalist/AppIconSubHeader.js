// @flow

import * as React from "react";
import { View, Text, Image } from "react-native";

import { viewStyles, textStyles, imageStyles } from "../../styles/iNaturalist/iNatStats";
import logos from "../../assets/logos";
import { AppOrientationContext } from "../UserContext";

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
      <Text style={[
        textStyles.secondHeaderText,
        largeIcon && textStyles.smallerTextWidth,
        isTablet && viewStyles.tabletContainer,
        ( isTablet && largeIcon ) && viewStyles.landscapeContainerLargeIcon
      ]}>
        {text}
      </Text>
    </View>
  );
};

export default AppIconSubHeader;
