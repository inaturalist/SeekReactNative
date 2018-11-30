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
const exitIconWhite = ( <Icon name="close" size={25} color={colors.white} /> );
const exitIconGray = ( <Icon name="close" size={25} color={colors.darkGray} /> );
const flashOnIcon = ( <Icon name="flash" size={25} color={colors.yellow} /> );
const flashOffIcon = ( <Icon name="flash-off" size={25} color={colors.white} /> );

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
        <Text style={styles.text}>{navigation.state.key === "PHOTOS" ? exitIconGray : exitIconWhite}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => toggleFlash()}
      >
        {navigation.state.key === "CAMERA" ? (
          <Text style={styles.text}>
            {flashText === "OFF" ? flashOffIcon : flashOnIcon}
            {flashText}
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
  </View>
);

export default CameraTopNav;
