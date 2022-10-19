// @flow

import React from "react";
import { View, Image } from "react-native";
import type { Node } from "react";

import { viewStyles, textStyles, imageStyles } from "../../styles/iNaturalist/iNatStats";
import i18n from "../../i18n";
import HorizontalScroll from "../UIComponents/HorizontalScroll";
import { useFetchPhotos } from "./hooks/inatHooks";
import StyledText from "../UIComponents/StyledText";

const INatStatsPhotos = ( ): Node => {
  const photos = useFetchPhotos( );

  const renderPhotos = ( ) => photos.map( ( photo ) => (
    <View key={`image${photo.photoUrl}`} style={viewStyles.center}>
      <Image
        source={{ uri: photo.photoUrl }}
        style={imageStyles.image}
      />
      <StyledText style={[textStyles.text, textStyles.caption]}>
        {i18n.t( "about_inat.x_seen_by_user", { speciesName: photo.commonName, user: photo.attribution } )}
      </StyledText>
    </View>
  ) );

  const photoList = renderPhotos( );

  return (
    <View style={viewStyles.photoMargins}>
      <HorizontalScroll photoList={photoList} />
    </View>
  );
};

export default INatStatsPhotos;
