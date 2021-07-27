// @flow

import React from "react";
import { Text, View } from "react-native";
import type { Node } from "react";
import { isLandscape } from "react-native-device-info";

import i18n from "../../i18n";
import iconicTaxaNames from "../../utility/dictionaries/iconicTaxonDict";
import { textStyles, viewStyles } from "../../styles/species/species";

type Props = {
  iconicTaxonId: number
}

const IconicTaxaName = ( { iconicTaxonId }: Props ): Node => {
  if ( !iconicTaxonId ) {
    return null;
  }
  return (
    <>
    {isLandscape( ) && <View style={viewStyles.topRibbon} />}
    <Text style={[textStyles.iconicTaxaText, isLandscape( ) && textStyles.largerPadding]}>
      {i18n.t( iconicTaxaNames[iconicTaxonId] ).toLocaleUpperCase( )}
    </Text>
    </>
  );
};

export default IconicTaxaName;
