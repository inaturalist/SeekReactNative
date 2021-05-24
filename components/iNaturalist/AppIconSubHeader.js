// @flow

import * as React from "react";
import { View, Text, Image } from "react-native";

import { viewStyles, textStyles, imageStyles } from "../../styles/iNaturalist/iNatStats";
import logos from "../../assets/logos";

type Props = {
  icon: string,
  text: string,
  largeIcon?: boolean
}

const AppIconSubHeader = ( { icon, text, largeIcon }: Props ): React.Node => (
  <View style={[viewStyles.row, viewStyles.center, viewStyles.secondHeader]}>
    <Image
      source={icon === "inat" ? logos.iNatAppIcon : logos.seekAppIcon}
      style={largeIcon ? imageStyles.largeIcon : imageStyles.smallIcon}
    />
    <Text style={[textStyles.secondHeaderText, largeIcon && textStyles.smallerTextWidth]}>
      {text}
    </Text>
  </View>
);

export default AppIconSubHeader;
