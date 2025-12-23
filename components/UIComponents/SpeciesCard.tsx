import * as React from "react";
import {
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";

import { viewStyles, textStyles } from "../../styles/uiComponents/speciesCard";
import iconicTaxa from "../../assets/iconicTaxa";
import i18n from "../../i18n";
import StyledText from "./StyledText";
import { baseTextStyles } from "../../styles/textStyles";

interface Props {
  handlePress?: () => void;
  photo: Object;
  allowFontScaling?: boolean;
  taxon: {
    iconicTaxonId?: number;
    preferredCommonName?: string;
    name: string;
  };
}

const SpeciesCard = ( {
  handlePress,
  photo,
  allowFontScaling = true,
  taxon,
}: Props ) => {
  const { preferredCommonName, name, iconicTaxonId } = taxon;

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        !handlePress ? viewStyles.notTouchable : viewStyles.touchableArea,
        viewStyles.row,
      ]}
      disabled={!handlePress}
    >
      {iconicTaxonId ? (
        <ImageBackground
          imageStyle={viewStyles.image}
          source={iconicTaxa[iconicTaxonId] || iconicTaxa[1]}
          style={viewStyles.image}
        >
          <Image source={photo} style={viewStyles.image} />
        </ImageBackground>
      ) : (
        <Image source={photo} style={viewStyles.image} />
      )}
      <View style={viewStyles.speciesNameContainer}>
        {!preferredCommonName && !name && (
          <StyledText
            allowFontScaling={allowFontScaling}
            style={[baseTextStyles.regular, textStyles.commonNameText]}
          >
            {i18n.t( "posting.unknown" )}
          </StyledText>
        )}
        {preferredCommonName ? (
          <StyledText
            allowFontScaling={allowFontScaling}
            style={[baseTextStyles.regular, textStyles.commonNameText]}
          >
            {preferredCommonName}
          </StyledText>
        ) : (
          <StyledText
            allowFontScaling={allowFontScaling}
            style={[baseTextStyles.italic, textStyles.scientificNameHeaderText]}
          >
            {name}
          </StyledText>
        )}
        {name && (
          <StyledText
            allowFontScaling={allowFontScaling}
            style={[baseTextStyles.italic, textStyles.scientificNameText]}
          >
            {name}
          </StyledText>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SpeciesCard;
