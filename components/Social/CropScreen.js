import React from "react";
import { View } from "react-native";
import { CropView } from "react-native-image-crop-tools";

import { dimensions } from "../../styles/global";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import GreenText from "../UIComponents/GreenText";
import BackArrow from "../UIComponents/Buttons/BackArrow";
import styles from "../../styles/social/social";
// import SquareImageCropper from "./SquareImageCropper";

const aspectRatio = { width: 16, height: 16 };

const CropScreen = ( { saveCrop, uri, cropViewRef, handleImageCrop }: Props ) => (
  <View style={styles.cropScreenContainer}>
    <View style={styles.header}>
      <BackArrow green />
      <View style={styles.headerText}>
        <GreenText allowFontScaling={false} smaller text="social.adjust_square_crop" />
      </View>
      <View />
    </View>
    <CropView
      sourceUrl={uri}
      style={styles.cropView}
      ref={cropViewRef}
      onImageCrop={handleImageCrop}
      keepAspectRatio
      aspectRatio={aspectRatio}
    />
    <View style={styles.cropFooter}>
      <GreenButton
        width={dimensions.width}
        handlePress={saveCrop}
        text="social.crop_image"
      />
    </View>
  </View>
);

export default CropScreen;
