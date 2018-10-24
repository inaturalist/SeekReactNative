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

    this.state = {
      cameraType: RNCamera.Constants.Type.back,
      cameraTypeText: "Front camera",
      flash: RNCamera.Constants.FlashMode.off,
      flashText: "Flash on",
      photo: null,
      error: null
    };

    this.toggleCamera = this.toggleCamera.bind( this );
    this.toggleFlash = this.toggleFlash.bind( this );
    this.takePicture = this.takePicture.bind( this );
    this.getCameraCaptureFromGallery = this.getCameraCaptureFromGallery.bind( this );
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

  getCameraCaptureFromGallery() {
    const {
      navigation
    } = this.props;

    CameraRoll.getPhotos( {
      first: 1,
      assetType: "Photos"
    } ).then( ( results ) => {
      this.setState( {
        photo: results.edges[0].node
      }, () => navigation.navigate( "Results", {
        image: this.state.photo.image,
        time: this.state.photo.timestamp,
        latitude: this.state.photo.location.latitude ? this.truncateCoordinates( this.state.photo.location.latitude ) : null,
        longitude: this.state.photo.location.longitude ? this.truncateCoordinates( this.state.photo.location.longitude ) : null,
      } ) );
    } ).catch( ( err ) => {
      this.setState( {
        error: err.message
      } );
    } );
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
