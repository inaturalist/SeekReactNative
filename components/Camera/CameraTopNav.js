// @flow

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../../styles/camera";

type Props = {
  cameraTypeText: string,
  flashText: string,
  navigation: any,
  toggleFlash: Function,
  toggleCamera: Function,
}

const CameraTopNav = ( {
  cameraTypeText,
  flashText,
  navigation,
  toggleFlash,
  toggleCamera
}: Props ) => (
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
);

export default CameraTopNav;
