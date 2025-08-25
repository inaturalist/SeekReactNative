import * as React from "react";
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { textStyles, viewStyles } from "../../../styles/uiComponents/speciesNearby/speciesObservedCell";
import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import { setRoute, StoredRoutes } from "../../../utility/helpers";
import iconicTaxa from "../../../assets/iconicTaxa";
import { useCommonName } from "../../../utility/customHooks/useCommonName";
import { useSeenTaxa } from "../../../utility/customHooks/useSeenTaxa";
import { useUserPhoto } from "../../../utility/customHooks/useUserPhoto";
import StyledText from "../StyledText";
import { baseTextStyles } from "../../../styles/textStyles";
import { useSpeciesDetail } from "../../Providers/SpeciesDetailProvider";

interface Props {
  readonly item: {
    taxon: {
      id: number;
      name: string;
      iconicTaxonId: number;
    };
  }
}

const SpeciesObservedCell = ( { item }: Props ) => {
  const { setId } = useSpeciesDetail();
  const { navigate } = useNavigation();
  const { taxon } = item;
  const commonName = useCommonName( taxon.id );

  const seenTaxa = useSeenTaxa( taxon.id );
  const currentUserPhoto = useUserPhoto( seenTaxa );

  const navToSpeciesDetails = () => {
    setRoute( StoredRoutes.ChallengeDetails );
    setId( taxon.id );
    navigate( "Species" );
  };

  return (
    <TouchableOpacity
      style={viewStyles.gridCell}
      onPress={navToSpeciesDetails}
    >
      {currentUserPhoto && (
        <>
          <ImageBackground
            source={iconicTaxa[taxon.iconicTaxonId]}
            style={viewStyles.cellImage}
            imageStyle={viewStyles.cellImage}
          >
            <Image source={{ uri: currentUserPhoto.uri }} style={viewStyles.cellImage} />
            <Image source={icons.speciesObserved} style={viewStyles.checkbox} />
          </ImageBackground>
          <View style={viewStyles.cellTitle}>
            <StyledText
              numberOfLines={3}
              style={[baseTextStyles.body, textStyles.cellTitleText, !commonName && baseTextStyles.italic]}
            >
            {commonName
              ? i18n.locale === "de" ? commonName.replace( /(- |-)/g, "-\n" ) : commonName
              : taxon.name}
            </StyledText>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default SpeciesObservedCell;
