// @flow

import * as React from "react";
import { TouchableOpacity, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { viewStyles, textStyles } from "../../../styles/uiComponents/speciesNearby/speciesObservedCell";
import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import { setRoute } from "../../../utility/helpers";
import iconicTaxa from "../../../assets/iconicTaxa";
import { useSeenTaxa, useCommonName } from "../../../utility/customHooks";
import { SpeciesDetailContext } from "../../UserContext";
import StyledText from "../StyledText";

type Props = {
  +item: Object
}

const SpeciesImageCell = ( { item }: Props ): React.Node => {
  const { setId } = React.useContext( SpeciesDetailContext );
  const navigation = useNavigation( );
  const { navigate } = navigation;
  const route = useRoute( );
  const { name } = route;

  const seenTaxa = useSeenTaxa( item.id );
  const commonName = useCommonName( item.id );

  const photo = item.default_photo;

  const renderSpeciesImage = ( ) => {
    const extraPhotos = item.taxonPhotos || item.taxon_photos;
    let source = iconicTaxa[item.iconic_taxon_id];

    if ( photo.medium_url && photo.license_code ) {
      source = { uri: photo.medium_url };
    } else if ( extraPhotos ) {
      const licensed = extraPhotos.find( p => p.photo.license_code );
      if ( licensed ) {
        source = { uri: licensed.photo.medium_url };
      }
    }

    return <Image source={source} style={viewStyles.cellImage} />;
  };

  const navToNextScreen = ( ) => {
    setId( item.id );
    if ( name === "Species" ) {
      navigation.push( "Drawer", { screen: "Species" } );
    } else {
      // Match is for common ancestor match screen with species nearby card
      setRoute( name === "Match" ? "Match" : "Home" );
      navigate( "Species" );
    }
  };

  return (
    <TouchableOpacity onPress={navToNextScreen} style={viewStyles.gridCell}>
      {photo && renderSpeciesImage( )}
      {seenTaxa && <Image source={icons.speciesObserved} style={[viewStyles.checkbox, viewStyles.speciesImageCheckbox]} />}
      <StyledText
        numberOfLines={3}
        style={[
          textStyles.speciesNameText,
          !commonName && textStyles.scientificName,
          name === "ChallengeDetails" && textStyles.challengeDetailsText
        ]}>
      {commonName
          ? i18n.locale === "de" ? commonName.replace( /(- |-)/g, "-\n" ) : commonName
          : item.name}
      </StyledText>
    </TouchableOpacity>
  );
};

export default SpeciesImageCell;
