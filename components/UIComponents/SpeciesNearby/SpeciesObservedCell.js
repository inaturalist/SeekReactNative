// @flow

import * as React from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import { textStyles, viewStyles } from "../../../styles/uiComponents/speciesNearby/speciesObservedCell";
import i18n from "../../../i18n";
import icons from "../../../assets/icons";
import { setRoute } from "../../../utility/helpers";
import iconicTaxa from "../../../assets/iconicTaxa";
import { useCommonName, useSeenTaxa, useUserPhoto } from "../../../utility/customHooks";
import { SpeciesDetailContext } from "../../UserContext";

type Props = {
  +item: Object
}

const SpeciesObservedCell = ( { item }: Props ): Node => {
  const { setId } = React.useContext( SpeciesDetailContext );
  const { navigate } = useNavigation();
  const { taxon } = item;
  const commonName = useCommonName( taxon.id );

  const seenTaxa = useSeenTaxa( taxon.id );
  const currentUserPhoto = useUserPhoto( seenTaxa );

  const navToSpeciesDetails = () => {
    setRoute( "ChallengeDetails" );
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
            <Text numberOfLines={3} style={[textStyles.cellTitleText, !commonName && textStyles.scientificName]}>
            {commonName
              ? i18n.locale === "de" ? commonName.replace( /(- |-)/g, "-\n" ) : commonName
              : taxon.name}
            </Text>
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

export default SpeciesObservedCell;
