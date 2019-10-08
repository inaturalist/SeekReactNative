// @flow

import React from "react";
import { Text, View } from "react-native";

import styles from "../../styles/camera/error";

type Props = {
  +error: string,
  +camera: boolean
}

const ErrorScreen = ( { error, camera }: Props ) => (
  <View style={camera ? styles.cameraError : styles.galleryError}>
    <Text style={styles.errorText}>{error}</Text>
  </View>
);

export default ErrorScreen;
