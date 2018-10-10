// @flow

import React, { Component } from "react";
import { CameraRoll, View } from "react-native";
import { RNCamera } from "react-native-camera";

import CameraCaptureScreen from "./CameraCaptureScreen";
import styles from "../styles/camera";

type Props = {
  navigation: any
}

class CameraScreen extends Component {
  constructor( { navigation }: Props ) {
    super();

    this.state = {
      cameraType: RNCamera.Constants.Type.back,
      cameraTypeText: "Front camera",
      flash: RNCamera.Constants.FlashMode.off,
      flashText: "Flash on",
      error: null
    };

    this.toggleCamera = this.toggleCamera.bind( this );
    this.toggleFlash = this.toggleFlash.bind( this );
    this.takePicture = this.takePicture.bind( this );
  }

  takePicture = async () => {
    if ( this.camera ) {
      this.camera
        .takePictureAsync()
        .then( data => CameraRoll.saveToCameraRoll( data.uri, "photo" ) )
        .catch( ( err ) => {
          this.setState( {
            error: err.message
          } );
        } );
    }
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

    const {
      navigation
    } = this.props;

    return (
      <RNCamera
        ref={( ref ) => {
          this.camera = ref;
        }}
        type={cameraType}
        style={{ flex: 1 }}
        flashMode={flash}
        permissionDialogTitle="Permission to use camera"
        permissionDialogMessage="We need your permission to use your camera phone"
        pendingAuthorizationView={
          <View style={styles.pendingAuthorization} />
        }
        notAuthorizedView={
          <View style={styles.notAuthorized} />
        }
      >
        <CameraCaptureScreen
          cameraTypeText={cameraTypeText}
          flashText={flashText}
          navigation={navigation}
          takePicture={this.takePicture}
          toggleFlash={this.toggleFlash}
          toggleCamera={this.toggleCamera}
        />
      </RNCamera>
    );
  }
}

export default CameraScreen;
