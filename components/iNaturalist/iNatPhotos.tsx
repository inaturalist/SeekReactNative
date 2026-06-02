import { useNetInfo } from "@react-native-community/netinfo";
import React from "react";
import { Image, View } from "react-native";

import i18n from "../../i18n";
import { imageStyles, textStyles, viewStyles } from "../../styles/iNaturalist/iNatStats";
import { baseTextStyles } from "../../styles/textStyles";
import HorizontalScroll from "../UIComponents/HorizontalScroll";
import StyledText from "../UIComponents/StyledText";
import { useFetchPhotos } from "./hooks/inatHooks";

const INatStatsPhotos = ( ) => {
  const netInfo = useNetInfo();
  const { isConnected } = netInfo;

  const photos: {
    photoUrl?: string;
    commonName: string;
    attribution: string;
  }[] = useFetchPhotos( );

  const renderPhotos = ( ) => photos.map( ( photo, index ) => (
    <View key={index} style={viewStyles.center}>
      {photo?.photoUrl && <Image
        source={{ uri: photo.photoUrl }}
        style={imageStyles.image}
      />}
      <StyledText style={[baseTextStyles.body, textStyles.caption]}>
        {i18n.t( "about_inat.x_seen_by_user", { speciesName: photo.commonName, user: photo.attribution } )}
      </StyledText>
    </View>
  ) );

  const photoList = renderPhotos( );

  return (
    <View style={viewStyles.photoMargins}>
      {( !isConnected || photos.length === 0 ) ? null : <HorizontalScroll photoList={photoList} />}
    </View>
  );
};

export default INatStatsPhotos;
