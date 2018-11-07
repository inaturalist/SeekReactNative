// @flow

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../../styles/cameraNavBar";

type Props = {
  camera: boolean,
  cameraTypeText: string,
  flashText: string,
  navigation: any,
  toggleFlash: Function,
  toggleCamera: Function,
}

const CameraTopNav = ( {
  camera,
  cameraTypeText,
  flashText,
  navigation,
  toggleFlash,
  toggleCamera
}: Props ) => (
  <View style={[styles.header, !camera && styles.coloredHeader]}>
    <TouchableOpacity
      style={styles.buttons}
      onPress={() => navigation.navigate( "Main" )}
    >
      <Text style={styles.text}>X</Text>
    </TouchableOpacity>
    { camera ? (
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => toggleFlash()}
      >
        <Text style={styles.text}>{flashText}</Text>
      </TouchableOpacity>
    ) : null }
    { camera ? (
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => toggleCamera()}
      >
        <Text style={styles.text}>{cameraTypeText}</Text>
      </TouchableOpacity>
    ) : null
    }
  </View>
);

export default CameraTopNav;
