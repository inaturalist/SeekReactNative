// @flow

import React from "react";
import { View } from "react-native";

import CameraTopNav from "./CameraTopNav";
import CameraCapture from "./CameraCapture";
import CameraBottomNav from "./CameraBottomNav";
import GalleryScreen from "./GalleryScreen";
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
  getCameraCaptureFromGallery: Function,
  photos: Array<Object>,
  loading: boolean,
  selectImage: Function,
  getPhotos: Function
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
  getCameraCaptureFromGallery,
  photos,
  loading,
  selectImage,
  getPhotos
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
      { camera ? (
        <CameraCapture
          id={id}
          takePicture={takePicture}
          getCameraCaptureFromGallery={getCameraCaptureFromGallery}
        />
      ) : (
        <GalleryScreen
          navigation={navigation}
          camera={camera}
          toggleActiveLink={toggleActiveLink}
          photos={photos}
          loading={loading}
          selectImage={selectImage}
        />
      ) }
      <CameraBottomNav
        navigation={navigation}
        id={id}
        camera={camera}
        toggleActiveLink={toggleActiveLink}
        getPhotos={getPhotos}
      />
    </View>
  );
};

export default CameraCaptureScreen;
