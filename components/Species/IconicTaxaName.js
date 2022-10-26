// @flow

import React, { useContext } from "react";
import { View } from "react-native";
import type { Node } from "react";

import i18n from "../../i18n";
import iconicTaxaNames from "../../utility/dictionaries/iconicTaxonDict";
import { textStyles, viewStyles } from "../../styles/species/species";
import { AppOrientationContext } from "../UserContext";
import StyledText from "../UIComponents/StyledText";

type Props = {
  iconicTaxonId: number
}

const IconicTaxaName = ( { iconicTaxonId }: Props ): Node => {
  const { isLandscape } = useContext( AppOrientationContext );

  return (
    <>
    {isLandscape && <View style={viewStyles.topRibbon} />}
    <StyledText style={[textStyles.iconicTaxaText, isLandscape && textStyles.largerPadding]}>
      {iconicTaxonId && i18n.t( iconicTaxaNames[iconicTaxonId] ).toLocaleUpperCase( )}
    </StyledText>
    </>
  );
};

export default IconicTaxaName;
