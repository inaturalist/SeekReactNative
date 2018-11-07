// @flow

import React from "react";
import { View, TouchableOpacity } from "react-native";

import CameraTopNav from "./CameraTopNav";
import CameraBottomNav from "./CameraBottomNav";
import styles from "../../styles/camera";

type Props = {
  cameraTypeText: string,
  flashText: string,
  navigation: any,
  takePicture: Function,
  toggleFlash: Function,
  toggleCamera: Function,
  getCameraCaptureFromGallery: Function
}

const CameraCaptureScreen = ( {
  cameraTypeText,
  flashText,
  navigation,
  takePicture,
  toggleFlash,
  toggleCamera,
  getCameraCaptureFromGallery
}: Props ) => {
  const { id } = navigation.state.params;

  return (
    <View style={styles.container}>
      <CameraTopNav
        navigation={navigation}
        cameraTypeText={cameraTypeText}
        flashText={flashText}
        toggleFlash={toggleFlash}
        toggleCamera={toggleCamera}
      />
      <View style={styles.main} />
      <View style={styles.footer}>
        <View>
          <TouchableOpacity
            onPress={() => {
              takePicture();
              getCameraCaptureFromGallery( id );
            }}
            style={styles.capture}
          />
        </View>
        <CameraBottomNav navigation={navigation} id={id} />
      </View>
    </View>
  );
};

export default CameraCaptureScreen;
