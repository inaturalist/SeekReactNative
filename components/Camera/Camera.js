// @flow

import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import { CameraRoll, View, TouchableOpacity } from "react-native";

import styles from "../../styles/camera";
import LoadingWheel from "../LoadingWheel";
import CameraTopNav from "./CameraTopNav";

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
      cameraType: RNCamera.Constants.Type.back,
      flash: RNCamera.Constants.FlashMode.off,
      flashText: "Flash on",
      cameraTypeText: "Back",
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
        cameraTypeText: "Back"
      } );
    } else {
      this.setState( {
        cameraType: RNCamera.Constants.Type.back,
        cameraTypeText: "Front"
      } );
    }
  }

  render() {
    const {
      cameraType,
      flash,
      flashText,
      cameraTypeText,
      loading
    } = this.state;

    const { navigation } = this.props;

    let content;

    if ( loading ) {
      content = <LoadingWheel />;
    } else {
      content = (
        <View style={styles.container}>
          <View style={styles.main} />
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => this.takePicture()}
              style={styles.capture}
            />
          </View>
        </View>
      );
    }

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
          flash={flash}
          cameraType={cameraType}
          toggleFlash={this.toggleFlash}
          toggleCamera={this.toggleCamera}
          flashText={flashText}
          cameraTypeText={cameraTypeText}
        />
        {content}
      </RNCamera>
    );
  }
}

export default CameraScreen;
