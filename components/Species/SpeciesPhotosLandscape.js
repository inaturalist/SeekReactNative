// @flow
import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList
} from "react-native";
import type { Node } from "react";

import { viewStyles, textStyles, imageStyles } from "../../styles/species/speciesPhotosLandscape";
import { localizeAttributions } from "../../utility/photoHelpers";
import { useUserPhoto, useSeenTaxa } from "../../utility/customHooks";

type Props = {
  +photos: Array<Object>,
  +id: number
};

const SpeciesPhotos = ( { photos, id }: Props ): Node => {
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
          <Text style={textStyles.ccButtonText}>
            {localizeAttributions( photo.attribution, photo.license_code, "SpeciesDetail" )}
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

  const renderPhotoList = ( ) => (
    <FlatList
      data={photos}
      contentContainerStyle={viewStyles.landscapeBackground}
      renderItem={renderPhoto}
      keyExtractor={key}
      ListFooterComponent={renderFooter}
      bounces={false}
    />
  );

  return renderPhotoList( );
};

export default SpeciesPhotos;
