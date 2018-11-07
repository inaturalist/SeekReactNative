// @flow

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../../styles/cameraNavBar";

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
      <Text style={styles.text}>X</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.buttons}
      onPress={() => toggleFlash()}
    >
      <Text style={styles.text}>{flashText}</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.buttons}
      onPress={() => toggleCamera()}
    >
      <Text style={styles.text}>{cameraTypeText}</Text>
    </TouchableOpacity>
  </View>
);

export default CameraTopNav;
