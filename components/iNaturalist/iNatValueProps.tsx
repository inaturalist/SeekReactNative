import React from "react";
import { Image, View } from "react-native";

import icons from "../../assets/icons";
import i18n from "../../i18n";
import { textStyles, viewStyles } from "../../styles/iNaturalist/bulletedList";
import { baseTextStyles } from "../../styles/textStyles";
import StyledText from "../UIComponents/StyledText";


const INatValueProps = ( ) => [1, 2, 3, 4].map( ( item ) => (
  <View key={item.toString()} style={[
    viewStyles.valuePropBullets,
    viewStyles.bulletContainer,
  ]}>
    <View style={viewStyles.iconContainer}>
      <Image
        source={icons[`iNat_valueprop_bullet_${item}`]}
      />
    </View>
    <StyledText style={[baseTextStyles.body, textStyles.text]}>
      {i18n.t( `about_inat.inat_value_prop_${item}` )}
    </StyledText>
  </View>
) );

export default INatValueProps;
