import React from "react";
import {
  View,
  Image,
  Pressable
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import {
  viewStyles,
  textStyles,
  imageStyles
} from "../../styles/seekYearInReview/seekYearInReview";
import i18n from "../../i18n";
import HorizontalScroll from "../UIComponents/HorizontalScroll";
import StyledText from "../UIComponents/StyledText";
import { useSeenTaxa } from "../../utility/customHooks/useSeenTaxa";
import { useUserPhoto } from "../../utility/customHooks/useUserPhoto";
import { formatDateToDisplayShort } from "../../utility/dateHelpers";
import { setRoute, StoredRoutes } from "../../utility/helpers";
import { useSpeciesDetail } from "../Providers/SpeciesDetailProvider";
import { baseTextStyles } from "../../styles/textStyles";

const SeekYearInReviewPhotoItem = ( { observation, index } ) => {
  const seenTaxa = useSeenTaxa( observation?.taxon?.id );
  const userPhoto = useUserPhoto( seenTaxa );

  const { setId } = useSpeciesDetail();
  const navigation = useNavigation();

  const navToSpecies = () => {
    if ( !observation?.taxon?.id ) {
      return;
    }
    setId( observation.taxon.id );
    setRoute( StoredRoutes.SeekYearInReview );
    navigation.navigate( "Species" );
  };

  return (
    <Pressable
      key={index}
      style={viewStyles.center}
      onPress={() => navToSpecies()}
    >
      {userPhoto?.uri && <Image source={userPhoto} style={imageStyles.image} />}
      <StyledText style={[baseTextStyles.body, textStyles.caption]}>
        {i18n.t( "seek_year_in_review.observed_on", {
          speciesName:
            observation?.taxon?.preferredCommonName || observation?.taxon?.name,
          date: formatDateToDisplayShort( observation?.date )
        } )}
      </StyledText>
    </Pressable>
  );
};

const SeekYearInReviewPhotos = ( { observations } ) => {
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
