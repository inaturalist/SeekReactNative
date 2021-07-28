// @flow
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList
} from "react-native";
import type { Node } from "react";

import i18n from "../../i18n";
import { viewStyles, textStyles, imageStyles } from "../../styles/species/speciesPhotosLandscape";
import { localizeAttributionsLandscape } from "../../utility/photoHelpers";
import { useUserPhoto, useSeenTaxa, useIsLandscape } from "../../utility/customHooks";

type Props = {
  +photos: Array<Object>,
  +id: number
};

const SpeciesPhotosLandscape = ( { photos, id }: Props ): Node => {
  const isLandscape = useIsLandscape( );
  const seenTaxa = useSeenTaxa( id );
  const userPhoto = useUserPhoto( seenTaxa );

  const renderPhoto = ( { item, index } ) => {
    const photo = item;

    if ( !photo.license_code && index !== 0 ) {
      return null;
    }

    return (
      <View key={`image${photo.medium_url}`} style={viewStyles.imagePadding}>
        <Image source={{ uri: photo.medium_url }} style={imageStyles.image} />
        {photo.attribution && (
          <Text style={[textStyles.ccButtonText, isLandscape && textStyles.ccButtonLandscape]}>
            {localizeAttributionsLandscape( photo.attribution, photo.license_code, "SpeciesDetail" )}
          </Text>
        )}
      </View>
    );
  };

  useEffect( ( ) => {
    if ( userPhoto ) {
      photos.unshift( { medium_url: userPhoto.uri, attribution: null, license_code: null } );
    }
  }, [userPhoto, photos] );

  const key = ( item ) => item.medium_url;

  const renderFooter = ( ) => <View style={viewStyles.footer} />;

  // const renderEmptyComponent = ( ) => (
  //   <View style={viewStyles.errorContainer}>
  //     <Text style={textStyles.errorText}>{i18n.t( "species_detail.no_photos_found" )}</Text>
  //   </View>
  // );

  const renderPhotoList = ( ) => (
    <FlatList
      data={photos}
      contentContainerStyle={viewStyles.landscapeBackground}
      renderItem={renderPhoto}
      keyExtractor={key}
      ListFooterComponent={renderFooter}
      bounces={false}
      // ListEmptyComponent={renderEmptyComponent}
    />
  );

  return renderPhotoList( );
};

export default SpeciesPhotosLandscape;
