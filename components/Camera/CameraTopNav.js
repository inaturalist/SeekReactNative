// @flow

import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import CameraFlipIcon from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import i18n from "../../i18n";
import styles from "../../styles/camera/cameraNavBar";
import { colors } from "../../styles/global";

const cameraFlipIcon = ( <CameraFlipIcon name="ios-reverse-camera" size={25} color={colors.white} /> );
const flashOnIcon = ( <Icon name="flash" size={23} color={colors.yellow} /> );
const flashOffIcon = ( <Icon name="flash-off" size={23} color={colors.white} /> );

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
    <View />
    {navigation.state.key === "CAMERA" ? (
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => toggleFlash()}
      >
        <Text style={styles.text}>
          {flash === "off" ? flashOffIcon : flashOnIcon}
        </Text>
        <Text style={styles.text}>
          {flash === "off" ? i18n.t( "camera.off" ).toUpperCase() : i18n.t( "camera.on" ).toUpperCase()}
        </Text>
      </TouchableOpacity>
    ) : null}
    <TouchableOpacity onPress={() => toggleCamera()}>
      {navigation.state.key === "CAMERA" ? (
        <Text style={styles.text}>{cameraFlipIcon}</Text>
      ) : null}
    </TouchableOpacity>
  </View>
);

export default CameraTopNav;
