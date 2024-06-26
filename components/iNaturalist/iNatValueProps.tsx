import React from "react";
import { View, Image } from "react-native";

import { viewStyles, textStyles } from "../../styles/iNaturalist/bulletedList";
import i18n from "../../i18n";
import icons from "../../assets/icons";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";


const INatValueProps = ( ) => [1, 2, 3, 4].map( ( item ) => (
  <View key={item.toString()} style={[
    viewStyles.valuePropBullets,
    viewStyles.bulletContainer
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
