// @flow

import React, { useState, useEffect } from "react";
import {
  FlatList,
  View
} from "react-native";

import CameraError from "../CameraError";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import styles from "../../../styles/camera/gallery";
import { colors, dimensions } from "../../../styles/global";
import GalleryImage from "./GalleryImage";

type Props = {
  photos: Array<Object>,
  error: ?string,
  setPhotoParams: Function
}

const GalleryContainer = ( {
  setPhotoParams,
  error,
  photos
}: Props ) => {
  const [loading, setLoading] = useState( true );

  const toggleLoading = () => setLoading( !loading );

  useEffect( () => {
    if ( photos.length > 0 && !error ) {
      setLoading( false );
    }
  }, [photos, error] );

  const renderImage = ( { item }: Object ) => (
    <GalleryImage item={item} toggleLoading={toggleLoading} />
  );

  const renderLoadingWheel = () => (
    <View style={styles.loadingWheel}>
      <LoadingWheel color={colors.darkGray} />
    </View>
  );

  const renderGallery = () => {
    let gallery;

    if ( error ) {
      gallery = <CameraError error={error} errorEvent={null} />;
    } else {
      gallery = (
        <FlatList
          data={photos}
          getItemLayout={( data, index ) => (
            // skips measurement of dynamic content for faster loading
            {
              length: ( dimensions.width / 4 - 2 ),
              offset: ( dimensions.width / 4 - 2 ) * index,
              index
            }
          )}
          initialNumToRender={20}
          keyExtractor={( item, index ) => `${item}${index}`}
          numColumns={4}
          onEndReached={() => setPhotoParams()}
          renderItem={renderImage}
        />
      );
    }
    return gallery;
  };

  return (
    <>
      {loading && renderLoadingWheel()}
      {renderGallery()}
    </>
  );
};

export default GalleryContainer;
