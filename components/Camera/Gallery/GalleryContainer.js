// @flow

import React, { useState, useEffect } from "react";
import {
  FlatList,
  View
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

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
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState( false );

  const startLoading = () => setLoading( true );

  useEffect( () => {
    if ( photos.length > 0 && !error ) {
      setLoading( false );
    }
  }, [photos, error] );

  useEffect( () => {
    if ( !isFocused ) {
      setLoading( false );
    }
  }, [isFocused] );

  const renderLoadingWheel = () => (
    <View style={styles.loadingWheel}>
      <LoadingWheel color={colors.darkGray} />
    </View>
  );

  const renderGallery = () => (
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
      renderItem={( { item } ) => (
        <GalleryImage item={item} startLoading={startLoading} />
      )}
    />
  );

  return (
    <>
      {loading && renderLoadingWheel()}
      {error ? <CameraError error={error} errorEvent={null} /> : renderGallery()}
    </>
  );
};

export default GalleryContainer;
