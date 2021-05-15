// @flow

import * as React from "react";
import { View, Text } from "react-native";

import { viewStyles, textStyles } from "../../styles/home/inatCard";
import i18n from "../../i18n";

const INatValueProps = ( ): React.Node => [1, 2, 3, 4].map( ( item ) => (
  <View key={item.toString()} style={[viewStyles.bullets, viewStyles.row]}>
    <Text style={textStyles.marginRight}>
      &#8226;
    </Text>
    <Text style={[textStyles.text, viewStyles.bulletWidth]}>
      {i18n.t( `about_inat.inat_value_prop_${item}` )}
    </Text>
  </View>
) );

export default INatValueProps;
