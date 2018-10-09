// @flow

import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import styles from "../styles/camera";

type Props = {
  camera: Object,
  cameraTypeText: string,
  flashText: string,
  takePicture: Function,
  toggleFlash: Function,
  toggleCamera: Function
}

const CameraCaptureScreen = ( {
  camera, cameraTypeText, flashText, takePicture, toggleFlash, toggleCamera
}: Props ) => (
  <View style={styles.captureScreen}>
    <View style={styles.top}>
      <TouchableOpacity onPress={() => console.log( "exit camera" )}>
        <Text style={styles.buttons}>X</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleFlash()}>
        <Text style={styles.buttons}>{flashText}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggleCamera()}>
        <Text style={styles.buttons}>{cameraTypeText}</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.bottom}>
      <TouchableOpacity onPress={() => takePicture( camera )} style={styles.capture} />
    </View>
  </View>
);

export default CameraCaptureScreen;
