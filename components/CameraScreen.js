import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { RNCamera } from "react-native-camera";

import styles from "../styles/camera";

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: "lightgreen",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
    <Text>Waiting</Text>
  </View>
);

class CameraScreen extends Component {
  takePicture = async ( camera ) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync( options );
    //  eslint-disable-next-line
    console.log(data.uri);
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
        >
          {( { camera, status } ) => {
            if ( status !== "READY" ) return <PendingView />;
            return (
              <View style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}>
                <TouchableOpacity onPress={() => this.takePicture( camera )} style={styles.capture}>
                  <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}

export default CameraScreen;
