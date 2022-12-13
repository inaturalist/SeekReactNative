// @flow

import React from "react";
import {
  View,
  Image,
  Pressable
} from "react-native";
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
import { useSeenTaxa, useUserPhoto } from "../../utility/customHooks";
import { formatDateToDisplayShort } from "../../utility/dateHelpers";

const SeekYearInReviewPhotoItem = ( { observation, index } ): Node => {
  const seenTaxa = useSeenTaxa( observation?.taxon?.id );
  const userPhoto = useUserPhoto( seenTaxa );

  const { setId } = React.useContext( SpeciesDetailContext );
  const navigation = useNavigation();

  const navToSpecies = () => {
    if ( !observation?.taxon?.id ) {
      return;
    }
    setId( observation.taxon.id );
    navigation.navigate( "Species" );
  };

  return (
    <Pressable
      key={index}
      style={viewStyles.center}
      onPress={() => navToSpecies()}
    >
      <Image style={imageStyles.image} source={userPhoto} />
      <StyledText style={[textStyles.text, textStyles.caption]}>
        {i18n.t( "seek_year_in_review.observed_on", {
          speciesName:
            observation?.taxon?.preferredCommonName || observation?.taxon?.name,
          date: formatDateToDisplayShort( observation?.date )
        } )}
      </StyledText>
    </Pressable>
  );
};

const SeekYearInReviewPhotos = ( { observations } ): Node => {
  const renderPhotos = () =>
    observations.map( ( obs, index ) => <SeekYearInReviewPhotoItem observation={obs} index={index} /> );
  const photoList = renderPhotos();

  return (
    <View testID="year-in-review-photos-container">
      {photoList.length === 0 ? null : (
        <HorizontalScroll photoList={photoList} />
      )}
    </View>
  );
};

export default SeekYearInReviewPhotos;
