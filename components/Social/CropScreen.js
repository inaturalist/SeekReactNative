// @flow

import * as React from "react";
import { View } from "react-native";
// import { CropView } from "react-native-image-crop-tools";
import { SafeAreaView } from "react-native-safe-area-context";

import { dimensions } from "../../styles/global";
import GreenButton from "../UIComponents/Buttons/GreenButton";
import GreenText from "../UIComponents/GreenText";
import CustomBackArrow from "../UIComponents/Buttons/CustomBackArrow";
import { viewStyles } from "../../styles/social/social";

type Props = {
  saveCrop: Function,
  uri: ?string,
  cropViewRef: any,
  handleImageCrop: Function,
  closeModal: Function
}

const aspectRatio = { width: 16, height: 16 };

const CropScreen = ( {
  saveCrop,
  uri,
  cropViewRef,
  handleImageCrop,
  closeModal
}: Props ): React.Node => (
  <SafeAreaView style={viewStyles.cropScreenContainer} edges={["top"]}>
    <View style={viewStyles.header}>
      <CustomBackArrow handlePress={closeModal} style={viewStyles.backButton} green />
      <View style={viewStyles.headerText}>
        <GreenText allowFontScaling={false} smaller text="social.adjust_square_crop" />
      </View>
      <View />
    </View>
    {/* <CropView
      sourceUrl={uri}
      style={viewStyles.cropView}
      ref={cropViewRef}
      onImageCrop={handleImageCrop}
      keepAspectRatio
      aspectRatio={aspectRatio}
    /> */}
    <View style={viewStyles.cropFooter}>
      <GreenButton
        width={dimensions.width}
        handlePress={saveCrop}
        text="social.crop_image"
      />
    </View>
  </SafeAreaView>
);

export default CropScreen;
