// @flow

import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import { CameraRoll, View, TouchableOpacity } from "react-native";

import styles from "../../styles/camera";
import LoadingWheel from "../LoadingWheel";
import CameraTopNav from "./CameraTopNav";

const flashModeOrder = {
  off: "on",
  on: "off"
};

type Props = {
  navigation: any
}

class CameraScreen extends Component {
  constructor( { navigation }: Props ) {
    super();

    const {
      id,
      latitude,
      longitude,
      commonName
    } = navigation.state.params;

    this.state = {
      cameraType: "back",
      flash: "off",
      flashText: "ON",
      error: null,
      image: {},
      latitude,
      longitude,
      loading: false,
      time: null,
      id,
      commonName
    };

    this.toggleCamera = this.toggleCamera.bind( this );
    this.toggleFlash = this.toggleFlash.bind( this );
  }

  getCameraCaptureFromGallery( id ) {
    console.log( "photo being gathered from gallery" );
    const {
      latitude,
      longitude,
      commonName
    } = this.state;

    const {
      navigation
    } = this.props;

    CameraRoll.getPhotos( {
      first: 1,
      assetType: "Photos"
    } ).then( ( results ) => {
      const photo = results.edges[0].node;
      this.setState( {
        image: photo.image,
        time: photo.timestamp,
        loading: false
      }, () => navigation.navigate( "Results", {
        image: this.state.image,
        time: this.state.time,
        latitude,
        longitude,
        id,
        commonName
      } ) );
    } ).catch( ( err ) => {
      this.setState( {
        error: err.message
      } );
    } );
  }

  takePicture = async () => {
    console.log( "picture is taking" );
    this.setState( {
      loading: true
    } );

    if ( this.camera ) {
      this.camera
        .takePictureAsync()
        .then( data => this.savePhotoToGallery( data ) )
        .catch( ( err ) => {
          this.setState( {
            error: err.message,
            loading: false
          }, () => console.log( this.state.error, "error in taking pic async" ) );
        } );
    } else {
      this.setState( {
        error: "camera not working",
        loading: false
      }, () => console.log( this.state.error, "error in camera" ) );
    }
  }

  savePhotoToGallery( data ) {
    console.log( "photo being saved to gallery" );
    const { id } = this.state;

    CameraRoll.saveToCameraRoll( data.uri, "photo" )
      .then( () => this.getCameraCaptureFromGallery( id ) )
      .catch( ( err ) => {
        this.setState( {
          error: err.message
        } );
      } );
  }

  toggleFlash() {
    const { flash } = this.state;

    this.setState( {
      flash: flashModeOrder[flash],
      flashText: flash.toUpperCase()
    } );
  }

  toggleCamera() {
    const { cameraType } = this.state;

    this.setState( {
      cameraType: cameraType === "back" ? "front" : "back"
    } );
  }

  render() {
    const {
      cameraType,
      flash,
      flashText,
      loading
    } = this.state;

    const { navigation } = this.props;

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
        <CameraTopNav
          navigation={navigation}
          cameraType={cameraType}
          flashText={flashText}
          toggleFlash={this.toggleFlash}
          toggleCamera={this.toggleCamera}
        />
        {loading ? <LoadingWheel /> : (
          <View style={styles.container}>
            <View style={styles.main} />
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => this.takePicture()}
                style={styles.capture}
              />
            </View>
          </View>
        )}
      </RNCamera>
    );
  }
}

export default CameraScreen;
