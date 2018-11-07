// @flow

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import styles from "../../styles/cameraNavBar";

type Props = {
  camera: boolean,
  toggleActiveLink: Function,
  getPhotos: Function
}

const CameraBottomNav = ( {
  camera,
  toggleActiveLink,
  getPhotos
}: Props ) => (
  <View style={styles.footer}>
    <View style={styles.bottomNavigation}>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => {
          if ( !camera ) {
            toggleActiveLink();
          }
        }}
      >
        <Text style={[styles.text, camera && styles.underline]}>CAMERA</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttons}
        onPress={() => {
          if ( camera ) {
            getPhotos();
            toggleActiveLink();
          }
        }}
      >
        <Text style={[styles.text, !camera && styles.underline]}>PHOTOS</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default CameraBottomNav;
