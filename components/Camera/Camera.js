// @flow

import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import { CameraRoll, View, TouchableOpacity } from "react-native";

import styles from "../../styles/camera";

type Props = {
  navigation: any
}

class CameraScreen extends Component {
  constructor( { navigation }: Props ) {
    super();

    const { id, latitude, longitude } = navigation.state.params;

    this.state = {
      cameraType: RNCamera.Constants.Type.back,
      error: null,
      flash: RNCamera.Constants.FlashMode.off,
      image: {},
      latitude,
      longitude,
      time: null,
      id
    };
  }

  getCameraCaptureFromGallery( id ) {
    const {
      latitude,
      longitude
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
        time: photo.timestamp
      }, () => navigation.navigate( "Results", {
        image: this.state.image,
        time: this.state.time,
        latitude,
        longitude,
        id
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
        .then( data => this.savePhotoToGallery( data ) )
        .catch( ( err ) => {
          this.setState( {
            error: err.message
          } );
        } );
    }
  }

  savePhotoToGallery( data ) {
    const { id } = this.state;

    CameraRoll.saveToCameraRoll( data.uri, "photo" )
      .then( () => this.getCameraCaptureFromGallery( id ) )
      .catch( ( err ) => {
        this.setState( {
          error: err.message
        } );
      } );
  }

  render() {
    const {
      cameraType,
      flash
    } = this.state;

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
        <View style={styles.container}>
          <View style={styles.main} />
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => {
                this.takePicture();
              }}
              style={styles.capture}
            />
          </View>
        </View>
      </RNCamera>
    );
  }
}

export default CameraScreen;
