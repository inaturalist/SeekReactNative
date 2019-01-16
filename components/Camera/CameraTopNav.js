// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import CameraFlipIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import styles from "../../styles/cameraNavBar";
import { colors } from "../../styles/global";

const cameraFlipIcon = ( <CameraFlipIcon name="ios-reverse-camera" size={30} color={colors.white} /> );
const flashOnIcon = ( <Icon name="flash" size={25} color={colors.yellow} /> );
const flashOffIcon = ( <Icon name="flash-off" size={25} color={colors.white} /> );

type Props = {
  flash: string,
  navigation: any,
  toggleFlash: Function,
  toggleCamera: Function
}

const CameraTopNav = ( {
  flash,
  navigation,
  toggleFlash,
  toggleCamera
}: Props ) => (
  <View style={styles.header}>
    <TouchableOpacity
      style={styles.buttons}
    />
    <TouchableOpacity
      style={styles.buttons}
      onPress={() => toggleFlash()}
    >
      {navigation.state.key === "CAMERA" ? (
        <Text style={styles.text}>
          {flash === "off" ? flashOffIcon : flashOnIcon}
          {flash.toUpperCase()}
        </Text>
      ) : null}
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.buttons}
      onPress={() => toggleCamera()}
    >
      {navigation.state.key === "CAMERA" ? (
        <Text style={styles.text}>{cameraFlipIcon}</Text>
      ) : null}
    </TouchableOpacity>
  </View>
);

export default CameraTopNav;
