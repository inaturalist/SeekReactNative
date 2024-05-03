import React from "react";
import { View } from "react-native";

import i18n from "../../i18n";
import iconicTaxaNames from "../../utility/dictionaries/iconicTaxonDict";
import { textStyles, viewStyles } from "../../styles/species/species";
import StyledText from "../UIComponents/StyledText";
import { useAppOrientation } from "../Providers/AppOrientationContext";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  loading: boolean;
  iconicTaxonId: number;
}

const IconicTaxaName = ( { loading, iconicTaxonId }: Props ) => {
  const { isLandscape } = useAppOrientation( );
  return (
    <>
      {isLandscape && <View style={viewStyles.topRibbon} />}
      <StyledText
        style={[
          baseTextStyles.headerWhite,
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
