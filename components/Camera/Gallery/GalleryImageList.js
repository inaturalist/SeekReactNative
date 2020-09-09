// @flow

import React from "react";
import { FlatList } from "react-native";

import styles from "../../../styles/camera/gallery";
import { dimensions, colors } from "../../../styles/global";
import GalleryImage from "./GalleryImage";
import LoadingWheel from "../../UIComponents/LoadingWheel";

type Props = {
  photos: Array<Object>,
  setPhotoParams: Function,
  startLoading: Function,
  loading: boolean
}

const GalleryImageList = ( {
  setPhotoParams,
  photos,
  startLoading,
  loading
}: Props ) => {
  const renderLoading = () => <LoadingWheel color={colors.darkGray} />;
  const renderPhoto = ( { item } ) => (
    <GalleryImage item={item} startLoading={startLoading} loading={loading} />
  );

  return (
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
      onEndReached={setPhotoParams}
      ListEmptyComponent={renderLoading}
      renderItem={renderPhoto}
    />
  );
};

export default GalleryImageList;
