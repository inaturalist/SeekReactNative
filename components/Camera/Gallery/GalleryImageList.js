// @flow

import React, { useCallback, useMemo } from "react";
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
  const renderLoading = useCallback( () => <LoadingWheel color={colors.darkGray} />, [] );

  const renderCameraRollPhoto = useCallback( ( { item } ) => (
    <GalleryImage item={item} startLoading={startLoading} loading={loading} />
  ), [loading, startLoading] );

  // skips measurement of dynamic content for faster loading
  const getItemLayout = useCallback( ( data, index ) => ( {
    length: ( dimensions.width / 4 - 2 ),
    offset: ( dimensions.width / 4 - 2 ) * index,
    index
  } ), [] );

  const extractKey = useCallback( ( item, index ) => `${item}${index}`, [] );

  return useMemo( () => (
    <FlatList
      data={photos}
      contentContainerStyle={styles.grayContainer}
      getItemLayout={getItemLayout}
      initialNumToRender={20}
      keyExtractor={extractKey}
      numColumns={4}
      onEndReachedThreshold={1}
      onEndReached={setPhotoParams}
      ListEmptyComponent={renderLoading}
      renderItem={renderCameraRollPhoto}
    />
  ), [extractKey, renderCameraRollPhoto, renderLoading, getItemLayout, setPhotoParams, photos] );
};

export default GalleryImageList;
