import React from "react";
import { View } from "react-native";

import i18n from "../../i18n";
import { textStyles, viewStyles } from "../../styles/species/species";
import { baseTextStyles } from "../../styles/textStyles";
import { iconicTaxaNames } from "../../utility/dictionaries/taxonomyDicts";
import { useAppOrientation } from "../Providers/AppOrientationProvider";
import StyledText from "../UIComponents/StyledText";

interface Props {
  loading: boolean;
  iconicTaxonId: number | null;
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
          isLandscape && textStyles.largerPadding,
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
