// @flow

import React, { useCallback } from "react";
import { FlatList } from "react-native";

import styles from "../../../styles/camera/gallery";
import { dimensions } from "../../../styles/global";
import GalleryImage from "./GalleryImage";

type Props = {
  photos: Array<Object>,
  fetchPhotos: Function,
  setLoading: ( ) => void
}

const GalleryImageList = ( { fetchPhotos, photos, setLoading }: Props ) => {
  const renderImage = useCallback( ( { item } ) => <GalleryImage item={item} setLoading={setLoading} />, [setLoading] );

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
      initialNumToRender={4}
      keyExtractor={extractKey}
      numColumns={4}
      onEndReachedThreshold={0.2}
      onEndReached={fetchPhotos}
      renderItem={renderImage}
    />
  );
};

export default GalleryImageList;
