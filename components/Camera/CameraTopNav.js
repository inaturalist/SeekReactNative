// @flow

import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";

import styles from "../../styles/cameraNavBar";
import { colors } from "../../styles/global";

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
  <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => navigation.navigate( "Main" )}
      >
        <Text style={[styles.text, navigation.state.key === "PHOTOS" ? { color: colors.darkGray } : { color: colors.white }]}>X</Text>
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
        <Image style={styles.cameraFlip} source={require( "../../assets/reverse-camera.png" )} />
      </TouchableOpacity>
    </View>
  </View>
);

export default CameraTopNav;
