// @flow

import React from "react";
import { View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { Node } from "react";

import {
  viewStyles,
  textStyles,
  imageStyles
} from "../../styles/seekYearInReview/seekYearInReview";
import i18n from "../../i18n";
import HorizontalScroll from "../UIComponents/HorizontalScroll";
import StyledText from "../UIComponents/StyledText";
import { SpeciesDetailContext } from "../UserContext";
// import { useLocationName } from "../../utility/customHooks";

const SeekYearInReviewPhotoItem = ( { observation } ): Node => {
  const { setId } = React.useContext( SpeciesDetailContext );
  const navigation = useNavigation();
  // const locationName = useLocationName( observation.latitude, observation.longitude );

  const navToSpecies = ( ) => {
    if ( !observation?.taxon?.id ) {
      return;
    }
    setId( observation.taxon.id );
    navigation.navigate( "Species" );
  };

  return (
    <Pressable
      key={`image${observation.taxon.defaultPhoto.mediumUrl}`}
      style={[viewStyles.center, viewStyles.sliderItem]}
      onPress={() => navToSpecies()}
    >
      <Image
        source={{ uri: observation.taxon.defaultPhoto.mediumUrl }}
        style={imageStyles.image}
      />
      <StyledText style={[textStyles.text, textStyles.caption]}>
        {i18n.t( "seek_year_in_review.observed_on", {
          speciesName:
            observation?.taxon?.preferredCommonName || observation?.taxon?.name,
          date: observation?.date?.toLocaleDateString( i18n.locale )
        } )}
      </StyledText>
      {/* <StyledText style={[textStyles.text, textStyles.caption]}>
        {i18n.t( "seek_year_in_review.observed_in", {
          speciesName: observation?.taxon?.preferredCommonName || observation?.taxon?.name,
          place: locationName || i18n.t( "location_picker.undefined" )
        } )}
      </StyledText> */}
    </Pressable>
  );
};

const SeekYearInReviewPhotos = ( { observations } ): Node => {
  // TODO: replace the photo url from realm with the one given by the useUserPhoto hook
  const renderPhotos = () =>
    observations.map( ( obs ) => <SeekYearInReviewPhotoItem observation={obs} /> );
  const photoList = renderPhotos();

  return (
    <View style={viewStyles.photoMargins}>
      {photoList.length === 0 ? null : (
        <HorizontalScroll photoList={photoList} />
      )}
    </View>
  );
};

export default SeekYearInReviewPhotos;
