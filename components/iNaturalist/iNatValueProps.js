// @flow

import * as React from "react";
import { View, Text, Image } from "react-native";

import { viewStyles, textStyles } from "../../styles/iNaturalist/bulletedList";
import i18n from "../../i18n";
import icons from "../../assets/icons";

const INatValueProps = ( ): React.Node => [1, 2, 3, 4].map( ( item ) => (
  <View key={item.toString()} style={[
    viewStyles.valuePropBullets,
    viewStyles.bulletContainer
  ]}>
    <View style={viewStyles.iconContainer}>
      <Image
        source={icons[`iNat_valueprop_bullet_${item}`]}
      />
    </View>
    <Text style={[textStyles.text, textStyles.valuePropText]}>
      {i18n.t( `about_inat.inat_value_prop_${item}` )}
    </Text>
  </View>
) );

export default INatValueProps;
