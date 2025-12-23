import React from "react";
import { View, Image } from "react-native";
import { useNetInfo } from "@react-native-community/netinfo";

import { viewStyles, textStyles, imageStyles } from "../../styles/iNaturalist/iNatStats";
import i18n from "../../i18n";
import HorizontalScroll from "../UIComponents/HorizontalScroll";
import { useFetchPhotos } from "./hooks/inatHooks";
import StyledText from "../UIComponents/StyledText";
import { baseTextStyles } from "../../styles/textStyles";

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
