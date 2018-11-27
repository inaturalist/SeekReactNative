// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import styles from "../../styles/cameraNavBar";
import { colors } from "../../styles/global";

const cameraFlipIcon = ( <Icon name="ios-reverse-camera" size={30} color="white" /> );

type Props = {
  flashText: string,
  navigation: any,
  toggleFlash: Function,
  toggleCamera: Function,
}

const CameraTopNav = ( {
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
        <Text style={styles.cameraFlip}>{cameraFlipIcon}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default CameraTopNav;
