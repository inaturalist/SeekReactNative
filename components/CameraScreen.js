import React, { Component } from "react";
import { View, Text } from "react-native";
import { RNCamera } from "react-native-camera";

import CameraCaptureScreen from "./CameraCaptureScreen";
import styles from "../styles/camera";

const PendingView = () => (
  <View style={styles.pending}>
    <Text>Waiting</Text>
  </View>
);

class CameraScreen extends Component {
  constructor() {
    super();

    this.state = {
      cameraType: RNCamera.Constants.Type.back,
      cameraTypeText: "Front camera",
      flash: RNCamera.Constants.FlashMode.off,
      flashText: "Flash on"
    };

    this.toggleCamera = this.toggleCamera.bind( this );
    this.toggleFlash = this.toggleFlash.bind( this );
    this.takePicture = this.takePicture.bind( this );
  }

  takePicture = async ( camera ) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync( options );
    //  eslint-disable-next-line
    console.log(data.uri);
  }

  toggleFlash() {
    const {
      flash
    } = this.state;

    if ( flash === RNCamera.Constants.FlashMode.off ) {
      this.setState( {
        flash: RNCamera.Constants.FlashMode.on,
        flashText: "Flash off"
      } );
    } else {
      this.setState( {
        flash: RNCamera.Constants.FlashMode.off,
        flashText: "Flash on"
      } );
    }
  }

  toggleCamera() {
    const {
      cameraType
    } = this.state;

    if ( cameraType === RNCamera.Constants.Type.back ) {
      this.setState( {
        cameraType: RNCamera.Constants.Type.front,
        cameraTypeText: "Back camera"
      } );
    } else {
      this.setState( {
        cameraType: RNCamera.Constants.Type.back,
        cameraTypeText: "Front camera"
      } );
    }
  }

  render() {
    const {
      cameraType,
      flash,
      cameraTypeText,
      flashText
    } = this.state;

    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={cameraType}
          flashMode={flash}
          permissionDialogTitle="Permission to use camera"
          permissionDialogMessage="We need your permission to use your camera phone"
        >
          {( { camera, status } ) => ( status !== "READY"
            ? <PendingView /> : (
              <CameraCaptureScreen
                camera={camera}
                cameraTypeText={cameraTypeText}
                flashText={flashText}
                takePicture={this.takePicture}
                toggleFlash={this.toggleFlash}
                toggleCamera={this.toggleCamera}
              />
            ) )
          }
        </RNCamera>
      </View>
    );
  }
}

export default CameraScreen;
