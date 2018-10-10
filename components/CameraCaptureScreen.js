// @flow

import React from "react";
import { View, TouchableOpacity, Text } from "react-native";

import styles from "../styles/camera";

type Props = {
  cameraTypeText: string,
  flashText: string,
  navigation: any,
  takePicture: Function,
  toggleFlash: Function,
  toggleCamera: Function
}

const CameraCaptureScreen = ( {
  cameraTypeText, flashText, navigation, takePicture, toggleFlash, toggleCamera
}: Props ) => (
  <View
    style={{
      flex: 0.5,
      backgroundColor: "transparent",
      flexDirection: "row",
      justifyContent: "space-around"
    }}
  >
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
    <View
      style={{
        flex: 0.1,
        backgroundColor: "transparent",
        flexDirection: "row",
        alignSelf: "flex-end"
      }}
    >
      <TouchableOpacity onPress={() => takePicture()} style={styles.capture} />
    </View>
    <View
      style={{
        flex: 0.1,
        backgroundColor: "transparent",
        flexDirection: "row",
        alignSelf: "flex-end"
      }}
    >
      <TouchableOpacity
        style={[styles.buttons, { flex: 0.3, alignSelf: "flex-end" }]}
        onPress={() => navigation.navigate( "CameraCapture" )}
      >
        <Text style={styles.buttonText}>Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttons, { flex: 0.3, alignSelf: "flex-end" }]}
        onPress={() => navigation.navigate( "Gallery" )}
      >
        <Text style={styles.buttonText}>Gallery</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default CameraCaptureScreen;
