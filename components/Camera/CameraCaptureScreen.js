// @flow

import React from "react";
import { View } from "react-native";

import CameraTopNav from "./CameraTopNav";
import CameraCapture from "./CameraCapture";
import CameraBottomNav from "./CameraBottomNav";
import styles from "../../styles/camera";

type Props = {
  camera: boolean,
  toggleActiveLink: Function,
  cameraTypeText: string,
  flashText: string,
  navigation: any,
  takePicture: Function,
  toggleFlash: Function,
  toggleCamera: Function,
  getCameraCaptureFromGallery: Function
}

const CameraCaptureScreen = ( {
  camera,
  toggleActiveLink,
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
        camera={camera}
        navigation={navigation}
        cameraTypeText={cameraTypeText}
        flashText={flashText}
        toggleFlash={toggleFlash}
        toggleCamera={toggleCamera}
      />
      <View style={styles.main} />
      <CameraCapture
        id={id}
        takePicture={takePicture}
        getCameraCaptureFromGallery={getCameraCaptureFromGallery}
      />
      <CameraBottomNav
        navigation={navigation}
        id={id}
        camera={camera}
        toggleActiveLink={toggleActiveLink}
      />
    </View>
  );
};

export default CameraCaptureScreen;
