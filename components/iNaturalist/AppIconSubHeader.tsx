import * as React from "react";
import { Image, View } from "react-native";

import logos from "../../assets/logos";
import { imageStyles, textStyles, viewStyles } from "../../styles/iNaturalist/iNatStats";
import { baseTextStyles } from "../../styles/textStyles";
import { useAppOrientation } from "../Providers/AppOrientationProvider";
import StyledText from "../UIComponents/StyledText";

interface Props {
  icon: string;
  text: string;
  largeIcon?: boolean;
}

const AppIconSubHeader = ( { icon, text, largeIcon }: Props ) => {
  const { isTablet } = useAppOrientation( );

  return (
    <View style={[
      viewStyles.row,
      viewStyles.secondHeader,
      viewStyles.appIconSubHeader,
      isTablet && viewStyles.tabletContainer,
    ]}>
      <Image
        source={icon === "inat" ? logos.iNatAppIcon : logos.seekAppIcon}
        style={largeIcon ? imageStyles.largeIcon : imageStyles.smallIcon}
      />
      <StyledText style={[
        baseTextStyles.emptyState,
        largeIcon ? textStyles.smallerTextWidth : textStyles.secondHeaderText,
        isTablet && viewStyles.tabletContainer,
        ( isTablet && largeIcon ) && viewStyles.landscapeContainerLargeIcon,
      ]}>
        {text}
      </StyledText>
    </View>
  );
};

export default AppIconSubHeader;
