import { useNavigation, useRoute } from "@react-navigation/native";
import * as React from "react";
import { Image, TouchableOpacity } from "react-native";

import iconicTaxa from "../../../assets/iconicTaxa";
import icons from "../../../assets/icons";
import i18n from "../../../i18n";
import { baseTextStyles } from "../../../styles/textStyles";
import { textStyles, viewStyles } from "../../../styles/uiComponents/speciesNearby/speciesObservedCell";
import { useCommonName } from "../../../utility/customHooks/useCommonName";
import { useSeenTaxa } from "../../../utility/customHooks/useSeenTaxa";
import { setRoute, StoredRoutes } from "../../../utility/helpers";
import { useSpeciesDetail } from "../../Providers/SpeciesDetailProvider";
import StyledText from "../StyledText";

interface Props {
  readonly item: {
    id: number;
    name: string;
    iconic_taxon_id: number;
    default_photo: {
      medium_url: string;
      license_code: string;
    };
    taxonPhotos: {
      photo: {
        medium_url: string;
        license_code: string;
      };
    }[];
    taxon_photos: {
      photo: {
        medium_url: string;
        license_code: string;
      };
    }[];
  };
}

const SpeciesImageCell = ( { item }: Props ) => {
  const { setId } = useSpeciesDetail( );
  const navigation = useNavigation( );
  const { navigate } = navigation;
  const route = useRoute( );
  const { name } = route;

  const seenTaxa = useSeenTaxa( item.id );
  const commonName = useCommonName( item.id );

  const renderSpeciesImage = ( ) => {
    const photo = item.default_photo;
    if ( !photo ) {
      return null;
    }
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
      if ( name === "ChallengeDetails" ) {
        setRoute( StoredRoutes.ChallengeDetails );
      } else if ( name === "Match" ) {
        setRoute( StoredRoutes.Match );
      } else {
        setRoute( StoredRoutes.Home );
      }
      navigate( "Species" );
    }
  };

  return (
    <TouchableOpacity onPress={navToNextScreen} style={viewStyles.gridCell}>
      {renderSpeciesImage( )}
      {seenTaxa && <Image source={icons.speciesObserved} style={[viewStyles.checkbox, viewStyles.speciesImageCheckbox]} />}
      <StyledText
        numberOfLines={3}
        style={[
          name === "ChallengeDetails" ? baseTextStyles.body : baseTextStyles.bodyWhite,
          textStyles.speciesNameText,
          !commonName && baseTextStyles.italicWhite,
        ]}>
      {commonName
          ? i18n.locale === "de" ? commonName.replace( /(- |-)/g, "-\n" ) : commonName
          : item.name}
      </StyledText>
    </TouchableOpacity>
  );
};

export default SpeciesImageCell;
