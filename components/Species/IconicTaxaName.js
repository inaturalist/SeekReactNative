// @flow

import React from "react";
import { View } from "react-native";
import type { Node } from "react";

import i18n from "../../i18n";
import iconicTaxaNames from "../../utility/dictionaries/iconicTaxonDict";
import { textStyles, viewStyles } from "../../styles/species/species";
import StyledText from "../UIComponents/StyledText";
import { useAppOrientation } from "../Providers/AppOrientationContext";

type Props = {
  iconicTaxonId: number
}

const IconicTaxaName = ( { loading, iconicTaxonId }: Props ): Node => {
  const { isLandscape } = useAppOrientation( );
  return (
    <>
      {isLandscape && <View style={viewStyles.topRibbon} />}
      <StyledText
        style={[
          textStyles.iconicTaxaText,
          isLandscape && textStyles.largerPadding
        ]}
      >
        {!loading ? (
            iconicTaxonId && i18n.t( iconicTaxaNames[iconicTaxonId] ).toLocaleUpperCase()
          ) : null
        }
      </StyledText>
    </>
  );
};

export default IconicTaxaName;
