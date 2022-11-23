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

const SeekYearInReviewPhotos = ( { observations } ): Node => {
  const { setId } = React.useContext( SpeciesDetailContext );
  const navigation = useNavigation();

  const navToSpecies = ( obs ) => {
    if ( !obs?.taxon?.id ) { return; }
    setId( obs.taxon.id );
    navigation.push( "Drawer", { screen: "Species" } );
  };

  // TODO: replace the photo url from realm with the one given by the useUserPhoto hook
  const renderPhotos = () =>
    observations.map( ( obs ) => (
      <Pressable
        key={`image${obs.taxon.defaultPhoto.mediumUrl}`}
        style={[viewStyles.center, viewStyles.sliderItem]}
        onPress={() => navToSpecies( obs )}
      >
        <Image
          source={{ uri: obs.taxon.defaultPhoto.mediumUrl }}
          style={imageStyles.image}
        />
        <StyledText style={[textStyles.text, textStyles.caption]}>
          {i18n.t( "seek_year_in_review.observed_in", {
            // TODO: get common name from realm
            speciesName: obs?.taxon?.name,
            // TODO: reverseGeocode those coordinates {obs.latitude, obs.longitude}
            place: obs.attribution
          } )}
        </StyledText>
      </Pressable>
    ) );
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
