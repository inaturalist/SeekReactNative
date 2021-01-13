import React from "react";
import { View } from "react-native";
import ImageEditor from "@react-native-community/image-editor";
import ImageCropper from "./ImageCropper1";

import styles from "../../styles/social/squareImageCropper";
import { dimensions } from "../../styles/global";

// const DEFAULT_IMAGE_HEIGHT = dimensions.width;
// const DEFAULT_IMAGE_WIDTH = dimensions.width;
const DEFAULT_IMAGE_HEIGHT = 720;
const DEFAULT_IMAGE_WIDTH = 1080;

type Props = {
  uri: string,
  showWatermark: boolean,
  createSquareImage: Function
}

const SquareImageCropper = ( { uri, showWatermark, createSquareImage }: Props ) => {
  const measuredSize = { width: dimensions.width, height: dimensions.width };
  const photo = {
    uri,
    height: DEFAULT_IMAGE_HEIGHT,
    width: DEFAULT_IMAGE_WIDTH,
    showWatermark
};

  const crop = async ( data ) => {
    try {
      const cropped = await ImageEditor.cropImage( photo.uri, data );

      if ( cropped ) {
        createSquareImage( cropped );
      }
    } catch ( e ) {
      console.log( e, ": crop error" );
    }
  };

  const handleTransform = data => {
    console.log( data, "data from handle transform" );
    // crop( data );
  };

  const renderImageCropper = ( ) => {
    return (
      <View style={styles.container}>
        <ImageCropper
          image={photo}
          size={measuredSize}
          style={[styles.imageCropper, measuredSize]}
          onTransformDataChange={handleTransform}
        />
      </View>
    );
  };

  return renderImageCropper( );
};

export default SquareImageCropper;
