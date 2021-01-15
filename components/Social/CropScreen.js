import React, { useState } from "react";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import ImageEditor from "@react-native-community/image-editor";
import ImageCropper from "./ImageCropper";
import ExampleCropper from "./ExampleCropper";

import { dimensions } from "../../styles/global";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import GreenText from "../UIComponents/GreenText";
import BackArrow from "../UIComponents/Buttons/BackArrow";
import styles from "../../styles/social/social";
// import SquareImageCropper from "./SquareImageCropper";

const DEFAULT_IMAGE_HEIGHT = dimensions.width;
const DEFAULT_IMAGE_WIDTH = dimensions.width;

const CropScreen = ( ) => {
  const [data, setData] = useState( null );
  const [square, setSquare] = useState( null );
  const { params } = useRoute( );
  const { uri } = params;

  const measuredSize = { width: dimensions.width, height: dimensions.width };
  const photo = {
    uri,
    height: DEFAULT_IMAGE_HEIGHT,
    width: DEFAULT_IMAGE_WIDTH
};

console.log( square, data, "square image" );

  const crop = async ( ) => {
    try {
      const cropped = await ImageEditor.cropImage( uri, data );

      if ( cropped ) {
        setSquare( cropped );
      }
    } catch ( e ) {
      console.log( e, ": crop error" );
    }
  };

  const handleTransform = transformedData => setData( transformedData );

  return (
    <View style={styles.cropScreenContainer}>
      <View style={styles.header}>
        <BackArrow green />
        <View style={styles.headerText}>
          <GreenText allowFontScaling={false} smaller text="social.adjust_square_crop" />
        </View>
        <View />
      </View>
      <ExampleCropper uri={uri} />
      {/* <ImageCropper
        image={photo}
        size={measuredSize}
        onTransformDataChange={handleTransform}
      /> */}
      <View style={styles.cropFooter}>
        <GreenButton
          width={dimensions.width}
          handlePress={crop}
          text="social.crop_image"
        />
      </View>
    </View>
  );
};

export default CropScreen;
