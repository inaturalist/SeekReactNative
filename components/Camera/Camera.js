// @flow

import React, { Component } from "react";
import { RNCamera } from "react-native-camera";
import {
  PermissionsAndroid,
  Platform,
  CameraRoll,
  View,
  TouchableOpacity,
  StatusBar,
  SafeAreaView
} from "react-native";
import { NavigationEvents } from "react-navigation";

import styles from "../../styles/camera/camera";
import ErrorScreen from "../ErrorScreen";
import LoadingWheel from "../LoadingWheel";
import CameraTopNav from "./CameraTopNav";
import { getLatAndLng } from "../../utility/helpers";


const flashModeOrder = {
  off: "on",
  on: "off"
};

type Props = {
  navigation: any
}

class CameraScreen extends Component<Props> {
  constructor( { navigation }: Props ) {
    super();

    const {
      id,
      // latitude,
      // longitude,
      commonName
    } = navigation.state.params;

    this.state = {
      cameraType: "back",
      flash: "off",
      error: null,
      latitude: null,
      longitude: null,
      id,
      commonName,
      pictureTaken: false,
      focusedScreen: false
    };

    this.toggleCamera = this.toggleCamera.bind( this );
    this.toggleFlash = this.toggleFlash.bind( this );
  }

  async componentWillMount() {
    const location = await getLatAndLng();
    this.setState( {
      latitude: location.latitude,
      longitude: location.longitude
    } );
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
        pictureTaken: false
      }, () => navigation.push( "Results", {
        image: photo.image,
        time: photo.timestamp,
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
        pictureTaken: true
      } );
      this.camera
        .takePictureAsync( {
          fixOrientation: true,
          pauseAfterCapture: true,
          orientation: "portrait"
        } )
        .then( ( data ) => {
          if ( Platform.OS === "android" ) {
            this.requestAndroidPermissions( data );
          } else {
            this.savePhotoToGallery( data );
          }
        } )
        .catch( ( err ) => {
          this.setState( {
            error: err.message
          } );
        } );
    }
  }

  requestCameraPermissions = async () => {
    console.log( "permissions being asked" );
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if ( !granted === PermissionsAndroid.RESULTS.GRANTED ) {
        this.showError( "Camera permissions denied" );
      }
    } catch ( err ) {
      this.showError( `Camera permissions denied: ${err}` );
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

  resumeCamera() {
    if ( this.camera ) {
      this.camera.resumePreview();
    }
  }

  showError( err ) {
    this.setState( {
      error: err || "Permission to save photos denied"
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
      flash: flashModeOrder[flash]
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
      error,
      pictureTaken,
      focusedScreen
    } = this.state;

    const { navigation } = this.props;

    let cameraContent;

    if ( error ) {
      cameraContent = <ErrorScreen error={error} collection />;
    } else {
      cameraContent = (
        <View style={styles.container}>
          { pictureTaken ? (
            <LoadingWheel />
          ) : null }
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
      <SafeAreaView style={styles.safeView}>
        <View style={styles.container}>
          <NavigationEvents
            onWillFocus={() => {
              this.resumeCamera();
              this.setState( {
                focusedScreen: true
              } );
            }}
            onWillBlur={() => {
              this.setState( {
                focusedScreen: false
              } );
            }}
          />
          {focusedScreen ? (
            <RNCamera
              ref={( ref ) => {
                this.camera = ref;
              }}
              type={cameraType}
              style={styles.container}
              flashMode={flash}
              captureAudio={false}
              permissionDialogTitle="Permission to use camera"
              permissionDialogMessage="We need your permission to use your camera phone"
            >
              <StatusBar hidden />
              <CameraTopNav
                navigation={navigation}
                cameraType={cameraType}
                flash={flash}
                toggleFlash={this.toggleFlash}
                toggleCamera={this.toggleCamera}
              />
              {cameraContent}
            </RNCamera>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }
}

export default CameraScreen;
