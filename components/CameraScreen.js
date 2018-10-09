import React, { Component } from "react";
import { View } from "react-native";
import { RNCamera } from "react-native-camera";

import styles from "../styles/camera";

class CameraScreen extends Component {
  takePicture() {
    this.camera.capture()
      .then( data => console.log( data ) )
      .catch( err => console.error( err ) );
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera />
      </View>
    );
  }
}

export default CameraScreen;
