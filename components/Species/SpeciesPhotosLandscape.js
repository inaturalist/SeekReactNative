// @flow
import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  FlatList
} from "react-native";
import type { Node } from "react";

import { AppOrientationContext } from "../UserContext";
import { viewStyles, textStyles, imageStyles } from "../../styles/species/speciesPhotosLandscape";
import { localizeAttributionsLandscape } from "../../utility/photoHelpers";
import { useUserPhoto, useSeenTaxa } from "../../utility/customHooks";

type Props = {
  +photos: Array<Object>,
  +id: number
};

const SpeciesPhotosLandscape = ( { photos, id }: Props ): Node => {
  const { isLandscape, width } = useContext( AppOrientationContext );
  const columnWidth = width / 3;
  const seenTaxa = useSeenTaxa( id );
  const userPhoto = useUserPhoto( seenTaxa );

  const renderPhoto = ( { item, index } ) => {
    const photo = item;

    if ( !photo.license_code && index !== 0 ) {
      return null;
    }

    return (
      <View key={`image${photo.medium_url}`} style={viewStyles.imagePadding}>
        <Image
          source={{ uri: photo.medium_url }}
          style={[
            imageStyles.image, {
              width: columnWidth,
              height: columnWidth
            }
          ]}
        />
        {photo.attribution && (
          <Text style={[
            textStyles.ccButtonText,
            isLandscape && textStyles.ccButtonLandscape,
            { maxWidth: columnWidth }
          ]}>
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

  const key = ( item ) => "landscape-" + item.medium_url;

  const renderFooter = ( ) => <View style={viewStyles.footer} />;

  const renderEmptyComponent = ( ) => <View style={viewStyles.emptyBackground} />;

  const renderPhotoList = ( ) => (
    <FlatList
      data={photos}
      contentContainerStyle={[viewStyles.landscapeBackground, { width: columnWidth }]}
      renderItem={renderPhoto}
      keyExtractor={key}
      ListFooterComponent={renderFooter}
      bounces={false}
      ListEmptyComponent={renderEmptyComponent}
    />
  );

  return renderPhotoList( );
};

export default SpeciesPhotosLandscape;
