// @flow

import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import CameraNavBar from "./CameraNavBar";
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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => navigation.navigate( "Main" )}
        >
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => toggleFlash()}
        >
          <Text style={styles.buttonText}>{flashText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          onPress={() => toggleCamera()}
        >
          <Text style={styles.buttonText}>{cameraTypeText}</Text>
        </TouchableOpacity>
      </View>
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
        <CameraNavBar navigation={navigation} id={id} />
      </View>
    </View>
  );
};

export default CameraCaptureScreen;
