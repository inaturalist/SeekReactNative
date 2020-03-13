// @flow

import React from "react";
import {
  Image,
  FlatList,
  TouchableHighlight,
  View
} from "react-native";

import CameraError from "../CameraError";
import LoadingWheel from "../../UIComponents/LoadingWheel";
import styles from "../../../styles/camera/gallery";
import { colors, dimensions } from "../../../styles/global";

type Props = {
  photos: Array<Object>,
  error: ?string,
  loading: boolean,
  setPhotoParams: Function,
  selectAndResizeImage: Function
}

const GalleryContainer = ( {
  setPhotoParams,
  selectAndResizeImage,
  error,
  loading,
  photos
}: Props ) => {
  const renderItem = ( { item }: Object ) => (
    <TouchableHighlight
      accessibilityLabel={item.node.image.filename}
      accessible
      onPress={() => selectAndResizeImage( item.node )}
      style={styles.button}
      underlayColor="transparent"
    >
      <Image
        source={{ uri: item.node.image.uri }}
        style={styles.image}
      />
    </TouchableHighlight>
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
          ListEmptyComponent={() => (
            <View style={styles.loadingWheel}>
              <LoadingWheel color={colors.darkGray} />
            </View>
          )}
          numColumns={4}
          onEndReached={() => setPhotoParams()}
          renderItem={renderItem}
        />
      );
    }
    return gallery;
  };

  return (
    <>
      {loading ? (
        <View style={styles.loading}>
          <LoadingWheel color={colors.darkGray} />
        </View>
      ) : null}
      {renderGallery()}
    </>
  );
};

export default GalleryContainer;
