import React from "react";
import { Image, TouchableOpacity } from "react-native";

import { viewStyles, imageStyles } from "../../../styles/camera/gallery";

interface Item {
  node?: {
    image?: {
      uri?: string
    }
  }
}
interface Props {
  item: Item;
  selectImage: ( item: Item ) => void;
}

const GalleryImage = ( { item, selectImage }: Props ) => {
  if ( !item ) {
    return null;
  }
  const imageSource = { uri: item.node.image.uri };

  const handlePress = ( ) => selectImage( item );

  return (
    <TouchableOpacity
      accessibilityLabel={item.node.image.uri}
      accessible
      onPress={handlePress}
      style={viewStyles.button}
    >
      {item?.node?.image?.uri && <Image
        source={imageSource}
        style={imageStyles.image}
      />}
    </TouchableOpacity>
  );
};

export default GalleryImage;
