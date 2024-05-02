// @flow

import * as React from "react";
import { View, Image } from "react-native";

import { viewStyles, textStyles, imageStyles } from "../../styles/iNaturalist/iNatStats";
import logos from "../../assets/logos";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";
import { useAppOrientation } from "../Providers/AppOrientationContext";

type Props = {
  icon: string,
  text: string,
  largeIcon?: boolean
}

const AppIconSubHeader = ( { icon, text, largeIcon }: Props ): React.Node => {
  const { isTablet } = useAppOrientation( );

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
        baseTextStyles.emptyState,
        largeIcon ? textStyles.smallerTextWidth : textStyles.secondHeaderText,
        isTablet && viewStyles.tabletContainer,
        ( isTablet && largeIcon ) && viewStyles.landscapeContainerLargeIcon
      ]}>
        {text}
      </StyledText>
    </View>
  );
};

export default AppIconSubHeader;
