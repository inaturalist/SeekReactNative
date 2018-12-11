// @flow

import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import {
  PermissionsAndroid,
  Platform,
  CameraRoll,
  View,
  TouchableOpacity
} from "react-native";

import styles from "../../styles/camera";
import ErrorScreen from "../ErrorScreen";
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
      flashText: "OFF",
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
      }, () => navigation.push( "Results", {
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
    if ( this.camera ) {
      this.setState( {
        loading: true
      } );
      this.camera
        .takePictureAsync( { fixOrientation: true } )
        .then( ( data ) => {
          if ( Platform.OS === "android" ) {
            this.requestAndroidPermissions( data );
          } else {
            this.savePhotoToGallery( data );
          }
        } )
        .catch( ( err ) => {
          this.setState( {
            error: err.message,
            loading: false
          } );
        } );
    }
  }

  requestAndroidPermissions = async ( data ) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
        this.savePhotoToGallery( data );
      } else {
        this.showError( JSON.stringify( granted ) );
      }
    } catch ( err ) {
      this.showError( err );
    }
  }

  showError( err ) {
    this.setState( {
      error: err || "Permission to save photos denied",
      loading: false
    } );
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
    const { flash } = this.state;

    this.setState( {
      flash: flashModeOrder[flash],
      flashText: flashModeOrder[flash].toUpperCase()
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
      loading,
      error
    } = this.state;

    const { navigation } = this.props;

    let cameraContent;

    if ( error ) {
      cameraContent = <ErrorScreen error={error} collection />;
    } else if ( loading ) {
      cameraContent = <LoadingWheel />;
    } else {
      cameraContent = (
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
          cameraType={cameraType}
          flashText={flashText}
          toggleFlash={this.toggleFlash}
          toggleCamera={this.toggleCamera}
        />
        {cameraContent}
      </RNCamera>
    );
  }
}

export default CameraScreen;
