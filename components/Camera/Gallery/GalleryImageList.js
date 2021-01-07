// @flow

import React, { useCallback } from "react";
import { FlatList } from "react-native";

import styles from "../../../styles/camera/gallery";
import { dimensions, colors } from "../../../styles/global";
import GalleryImage from "./GalleryImage";
import LoadingWheel from "../../UIComponents/LoadingWheel";

type Props = {
  photos: Array<Object>,
  fetchPhotos: Function
}

const GalleryImageList = ( { fetchPhotos, photos }: Props ) => {
  const renderLoading = useCallback( () => <LoadingWheel color={colors.darkGray} />, [] );
  const renderCameraRollPhoto = useCallback( ( { item } ) => <GalleryImage item={item} />, [] );

  // skips measurement of dynamic content for faster loading
  const getItemLayout = useCallback( ( data, index ) => ( {
    length: ( dimensions.width / 4 - 2 ),
    offset: ( dimensions.width / 4 - 2 ) * index,
    index
  } ), [] );

  const extractKey = useCallback( ( item, index ) => `${item}${index}`, [] );

  return (
    <FlatList
      data={photos}
      contentContainerStyle={styles.grayContainer}
      getItemLayout={getItemLayout}
      initialNumToRender={20}
      keyExtractor={extractKey}
      numColumns={4}
      onEndReachedThreshold={1}
      onEndReached={fetchPhotos}
      ListEmptyComponent={renderLoading}
      renderItem={renderCameraRollPhoto}
    />
  );
};

export default GalleryImageList;
