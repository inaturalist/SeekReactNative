// @flow

import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import { CameraRoll } from "react-native";

import CameraCaptureScreen from "./CameraCaptureScreen";
import { truncateCoordinates } from "../../utility/helpers";

type Props = {
  navigation: any
}

class CameraScreen extends Component {
  constructor( { navigation }: Props ) {
    super();

    const { id, latitude, longitude } = navigation.state.params;

    this.state = {
      camera: true,
      cameraType: RNCamera.Constants.Type.back,
      cameraTypeText: "Front",
      error: null,
      flash: RNCamera.Constants.FlashMode.off,
      flashText: "Flash on",
      image: {},
      latitude,
      longitude,
      time: null,
      id,
      loading: true,
      photos: []
    };

    this.toggleCamera = this.toggleCamera.bind( this );
    this.toggleFlash = this.toggleFlash.bind( this );
    this.takePicture = this.takePicture.bind( this );
    this.toggleActiveLink = this.toggleActiveLink.bind( this );
    this.selectImage = this.selectImage.bind( this );
    this.getPhotos = this.getPhotos.bind( this );
  }

  getCameraCaptureFromGallery( id ) {
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

  getPhotos = () => {
    CameraRoll.getPhotos( {
      first: 100,
      assetType: "Photos"
    } ).then( ( results ) => {
      this.setState( {
        photos: results.edges,
        loading: false
      } );
    } ).catch( ( err ) => {
      this.setState( {
        error: err.message
      } );
    } );
  }

  savePhotoToGallery( data ) {
    CameraRoll.saveToCameraRoll( data.uri, "photo" )
      .then( () => this.getCameraCaptureFromGallery() )
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

  toggleActiveLink() {
    const { camera } = this.state;

    this.setState( {
      camera: !camera
    } );
  }

  selectImage( imageClicked, timestamp, location ) {
    // remember to deal with error state -> what happens if photo location undefined?
    const {
      id,
      latitude,
      longitude
    } = this.state;

    const {
      navigation
    } = this.props;

    this.setState( {
      image: imageClicked,
      time: timestamp,
      latitude: location.latitude ? truncateCoordinates( location.latitude ) : latitude,
      longitude: location.longitude ? truncateCoordinates( location.longitude ) : longitude
    }, () => navigation.navigate( "Results", {
      id,
      image: this.state.image,
      time: this.state.time,
      latitude: this.state.latitude,
      longitude: this.state.longitude
    } ) );
  }

  render() {
    const {
      camera,
      cameraType,
      flash,
      cameraTypeText,
      flashText,
      photos,
      loading,
      id
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
          camera={camera}
          toggleActiveLink={this.toggleActiveLink}
          cameraTypeText={cameraTypeText}
          flashText={flashText}
          navigation={navigation}
          takePicture={this.takePicture}
          toggleFlash={this.toggleFlash}
          toggleCamera={this.toggleCamera}
          photos={photos}
          loading={loading}
          selectImage={this.selectImage}
          getPhotos={this.getPhotos}
          id={id}
        />
      </RNCamera>
    );
  }
}

export default CameraScreen;
