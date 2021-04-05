// @flow

import React, { useCallback } from "react";
import { FlatList } from "react-native";
import type { Node } from "react";

import styles from "../../../styles/camera/gallery";
import { dimensions } from "../../../styles/global";
import GalleryImage from "./GalleryImage";

type Props = {
  photos: Array<Object>,
  onEndReached: Function,
  setLoading: ( ) => void
}

const GalleryImageList = ( { onEndReached, photos, setLoading }: Props ): Node => {
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
      onEndReached={onEndReached}
      renderItem={renderImage}
    />
  );
};

export default GalleryImageList;
