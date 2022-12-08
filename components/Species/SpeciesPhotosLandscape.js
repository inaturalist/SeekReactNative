// @flow
import React, { useEffect, useContext } from "react";
import {
  View,
  Image
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import type { Node } from "react";

import { AppOrientationContext } from "../UserContext";
import { viewStyles, textStyles, imageStyles } from "../../styles/species/speciesPhotosLandscape";
import { localizeAttributionsLandscape } from "../../utility/photoHelpers";
import { useUserPhoto, useSeenTaxa } from "../../utility/customHooks";
import StyledText from "../UIComponents/StyledText";
import LoadingWheel from "../UIComponents/LoadingWheel";
import { colors } from "../../styles/global";

type Props = {
  +photos: Array<Object>,
  +id: number
};

const SpeciesPhotosLandscape = ( { loading, photos, id }: Props ): Node => {
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
      <View style={viewStyles.imagePadding}>
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
          <StyledText style={[
            textStyles.ccButtonText,
            isLandscape && textStyles.ccButtonLandscape,
            { maxWidth: columnWidth }
          ]}>
            {localizeAttributionsLandscape( photo.attribution, photo.license_code, "SpeciesDetail" )}
          </StyledText>
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

  const renderPhotoList = () => {
    if ( loading ) {
      return (
        <View style={viewStyles.emptyBackground}>
          <LoadingWheel color={colors.white} />
        </View>
      );
    } else {
      return (
        <FlashList
          testID="species-photos-landscape"
          estimatedItemSize={470}
          data={photos}
          contentContainerStyle={viewStyles.landscapeBackground}
          renderItem={renderPhoto}
          keyExtractor={key}
          ListFooterComponent={renderFooter}
          bounces={false}
          ListEmptyComponent={renderEmptyComponent}
        />
      );
    }
  };

  return renderPhotoList( );
};

export default SpeciesPhotosLandscape;
