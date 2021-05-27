// @flow

import React from "react";
import { Image, TouchableOpacity } from "react-native";
import type { Node } from "react";

import { viewStyles, imageStyles } from "../../../styles/camera/gallery";

type Props = {
  item: Object,
  selectImage: ( Object ) => void
}

const GalleryImage = ( { item, selectImage }: Props ): Node => {
  const imageSource = { uri: item.node.image.uri };

  const handlePress = ( ) => selectImage( item );

  return (
    <TouchableOpacity
      accessibilityLabel={item.node.image.uri}
      accessible
      onPress={handlePress}
      style={viewStyles.button}
    >
      <Image
        source={imageSource}
        style={imageStyles.image}
      />
    </TouchableOpacity>
  );
};

export default GalleryImage;
