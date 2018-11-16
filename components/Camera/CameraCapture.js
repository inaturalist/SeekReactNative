// @flow
import React from "react";
import { View, TouchableOpacity } from "react-native";

import styles from "../../styles/camera";

type Props = {
  takePicture: Function
}

const CameraCapture = ( { takePicture }: Props ) => (
  <View style={styles.footer}>
    <TouchableOpacity
      onPress={() => {
        takePicture();
      }}
      style={styles.capture}
    />
  </View>
);

export default CameraCapture;
