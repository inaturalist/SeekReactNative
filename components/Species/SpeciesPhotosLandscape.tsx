import { FlashList } from "@shopify/flash-list";
import React, { useEffect } from "react";
import {
  Image,
  View,
} from "react-native";

import { colors } from "../../styles/global";
import { imageStyles, textStyles, viewStyles } from "../../styles/species/speciesPhotosLandscape";
import { baseTextStyles } from "../../styles/textStyles";
import { useSeenTaxa } from "../../utility/customHooks/useSeenTaxa";
import { useUserPhoto } from "../../utility/customHooks/useUserPhoto";
import { localizeAttributionsLandscape } from "../../utility/photoHelpers";
import { useAppOrientation } from "../Providers/AppOrientationProvider";
import LoadingWheel from "../UIComponents/LoadingWheel";
import StyledText from "../UIComponents/StyledText";

interface Photo {
  medium_url: string;
  attribution: string | null;
  license_code: string | null;
}
interface Props {
  readonly loading: boolean;
  readonly photos: Photo[];
  readonly id: number;
}

const SpeciesPhotosLandscape = ( { loading, photos, id }: Props ) => {
  const { isLandscape, width } = useAppOrientation( );
  const columnWidth = width / 3;
  const seenTaxa = useSeenTaxa( id );
  const userPhoto = useUserPhoto( seenTaxa );

  const renderPhoto = ( { item, index }: { item: Photo; index: number} ) => {
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
              height: columnWidth,
            },
          ]}
        />
        {photo.attribution && photo.license_code && (
          <StyledText style={[
            baseTextStyles.button,
            textStyles.ccButtonText,
            isLandscape && baseTextStyles.buttonRegular,
            { maxWidth: columnWidth },
          ]}>
            {localizeAttributionsLandscape( photo.attribution, photo.license_code )}
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

  const key = ( item: Photo ) => "landscape-" + item.medium_url;

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
