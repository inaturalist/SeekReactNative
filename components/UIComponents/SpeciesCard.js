// @flow

import * as React from "react";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  ImageBackground
} from "react-native";

import { viewStyles, textStyles } from "../../styles/uiComponents/speciesCard";
import iconicTaxa from "../../assets/iconicTaxa";
import i18n from "../../i18n";

type Props = {
  handlePress?: Function,
  photo: Object,
  allowFontScaling?: boolean,
  taxon: {
    iconicTaxonId: ?number,
    preferredCommonName: ?string,
    name: string
  }
}

const SpeciesCard = ( {
  handlePress,
  photo,
  allowFontScaling,
  taxon
}: Props ): React.Node => {
  const { preferredCommonName, name, iconicTaxonId } = taxon;

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[!handlePress ? viewStyles.notTouchable : viewStyles.touchableArea, viewStyles.row]}
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
      ) : <Image source={photo} style={viewStyles.image} />}
      <View style={viewStyles.speciesNameContainer}>
        <Text allowFontScaling={allowFontScaling} style={textStyles.commonNameText}>
          {( preferredCommonName || name )
            ? preferredCommonName || name
            : i18n.t( "posting.unknown" )}
        </Text>
        {name && (
          <Text allowFontScaling={allowFontScaling} style={textStyles.scientificNameText}>
            {name}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

SpeciesCard.defaultProps = {
  handlePress: null,
  allowFontScaling: true
};

export default SpeciesCard;
