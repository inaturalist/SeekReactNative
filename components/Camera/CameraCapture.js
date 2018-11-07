// @flow
import React from "react";
import { View, TouchableOpacity } from "react-native";

import styles from "../../styles/camera";

type Props = {
  id: number,
  takePicture: Function,
  getCameraCaptureFromGallery: Function
}

const CameraCapture = ( { id, takePicture, getCameraCaptureFromGallery }: Props ) => (
  <View style={styles.footer}>
    <TouchableOpacity
      onPress={() => {
        takePicture();
        getCameraCaptureFromGallery( id );
      }}
      style={styles.capture}
    />
  </View>
);

export default CameraCapture;
