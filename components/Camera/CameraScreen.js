// @flow

import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import { CameraRoll } from "react-native";

import CameraCaptureScreen from "./CameraCaptureScreen";

type Props = {
  navigation: any
}

class CameraScreen extends Component {
  constructor( { navigation }: Props ) {
    super();

    const { latitude, longitude } = navigation.state.params;

    this.state = {
      cameraType: RNCamera.Constants.Type.back,
      cameraTypeText: "Front camera",
      error: null,
      flash: RNCamera.Constants.FlashMode.off,
      flashText: "Flash on",
      image: {},
      latitude,
      longitude,
      time: null
    };

    this.toggleCamera = this.toggleCamera.bind( this );
    this.toggleFlash = this.toggleFlash.bind( this );
    this.takePicture = this.takePicture.bind( this );
    this.getCameraCaptureFromGallery = this.getCameraCaptureFromGallery.bind( this );
  }

  getCameraCaptureFromGallery() {
    const {
      latitude,
      longitude,
      navigation
    } = this.props;

    CameraRoll.getPhotos( {
      first: 1,
      assetType: "Photos"
    } ).then( ( results ) => {
      const photo = results.edges[0].node;
      this.setState( {
        image: photo.image,
        time: photo.timestamp
      }, () => navigation.navigate( "Results", {
        image: this.state.image,
        time: this.state.time,
        latitude,
        longitude
      } ) );
    } ).catch( ( err ) => {
      this.setState( {
        error: err.message
      } );
    } );
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

  truncateCoordinates( coordinate ) {
    return Number( coordinate.toFixed( 2 ) );
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
      >
        <CameraCaptureScreen
          cameraTypeText={cameraTypeText}
          flashText={flashText}
          navigation={navigation}
          takePicture={this.takePicture}
          toggleFlash={this.toggleFlash}
          toggleCamera={this.toggleCamera}
          getCameraCaptureFromGallery={this.getCameraCaptureFromGallery}
        />
      </RNCamera>
    );
  }
}

export default CameraScreen;
