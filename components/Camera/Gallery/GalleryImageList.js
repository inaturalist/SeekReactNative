// @flow

import React from "react";
import { FlatList } from "react-native";

import CameraError from "../CameraError";
import styles from "../../../styles/camera/gallery";
import { dimensions } from "../../../styles/global";
import GalleryImage from "./GalleryImage";

type Props = {
  photos: Array<Object>,
  error: ?string,
  setPhotoParams: Function,
  startLoading: Function,
  loading: boolean
}

const GalleryImageList = ( {
  setPhotoParams,
  error,
  photos,
  startLoading,
  loading
}: Props ) => {
  const renderGallery = () => (
    <FlatList
      data={photos}
      contentContainerStyle={styles.grayContainer}
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
      onEndReachedThreshold={1}
      onEndReached={() => setPhotoParams()}
      renderItem={( { item } ) => (
        <GalleryImage item={item} startLoading={startLoading} loading={loading} />
      )}
    />
  );

  return (
    <>
      {error ? <CameraError error={error} errorEvent={null} /> : renderGallery()}
    </>
  );
};

export default GalleryImageList;
