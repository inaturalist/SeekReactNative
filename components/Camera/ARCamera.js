// @flow

import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Text,
  Platform,
  NativeModules,
  Alert,
  CameraRoll
} from "react-native";
import { NavigationEvents } from "react-navigation";
import RNFS from "react-native-fs";

import INatCamera from "react-native-inat-camera";

import LoadingWheel from "../LoadingWheel";
import i18n from "../../i18n";
import styles from "../../styles/camera/arCamera";
import icons from "../../assets/icons";
import ARCameraHeader from "./ARCameraHeader";

type Props = {
  navigation: any
}

class ARCamera extends Component<Props> {
  constructor() {
    super();

    this.state = {
      ranks: {},
      rankToRender: null,
      loading: true,
      predictions: [],
      pictureTaken: false,
      error: null,
      focusedScreen: false
    };
  }

  setFocusedScreen( focusedScreen ) {
    this.setState( { focusedScreen } );
  }

  setPictureTaken( pictureTaken ) {
    this.setState( { pictureTaken } );
  }

  setImagePredictions( predictions ) {
    this.setState( { predictions } );
  }

  setLoading( loading ) {
    this.setState( { loading } );
  }

  setError( error ) {
    this.setState( { error } );
  }

  onTaxaDetected = ( event ) => {
    this.resetPredictions();

    const predictions = Object.assign( {}, event.nativeEvent );
    if ( predictions ) {
      this.setLoading( false );
    }

    if ( predictions.kingdom ) {
      this.setState( {
        ranks: {
          kingdom: predictions.kingdom
        },
        rankToRender: "kingdom"
      } );
    } else if ( predictions.phylum ) {
      this.setState( {
        ranks: {
          phylum: predictions.phylum
        },
        rankToRender: "phylum"
      } );
    } else if ( predictions.class ) {
      // Alert.alert( JSON.stringify( predictions ) );
      // console.log( predictions, "predictions in class" );
      this.setState( {
        ranks: {
          class: predictions.class
        },
        rankToRender: "class"
      } );
    } else if ( predictions.order ) {
      this.setState( {
        ranks: {
          order: predictions.order
        },
        rankToRender: "order"
      } );
    } else if ( predictions.family ) {
      this.setState( {
        ranks: {
          family: predictions.family
        },
        rankToRender: "family"
      } );
    } else if ( predictions.genus ) {
      this.setState( {
        ranks: {
          genus: predictions.genus
        },
        rankToRender: "genus"
      } );
    } else if ( predictions.species ) {
      this.setState( {
        ranks: {
          species: predictions.species
        },
        rankToRender: "species"
      } );
    }
  }

  onCameraError = ( event ) => {
    this.setError( `Camera error: ${event.nativeEvent.error}` );
  }

  onCameraPermissionMissing = () => {
    this.setError( "permissions" );
  }

  onClassifierError = ( event ) => {
    this.setError( `Classifier error: ${event.nativeEvent.error}` );
  }

  onDeviceNotSupported = ( event ) => {
    console.log( `Device not supported, reason: ${event.nativeEvent.reason}` );
    this.setError( `Device not supported, reason: ${event.nativeEvent.reason}` );
  }

  getCameraCaptureFromGallery() {
    CameraRoll.getPhotos( {
      first: 1,
      assetType: "Photos"
    } ).then( ( results ) => {
      const photo = results.edges[0].node;
      this.navigateToResults( photo );
    } ).catch( () => {
      // this.setError( "permissions" );
    } );
  }

  requestCameraPermissions = async () => {
    if ( Platform.OS === "android" ) {
      const camera = PermissionsAndroid.PERMISSIONS.CAMERA;

      try {
        const granted = await PermissionsAndroid.request( camera );
        if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
          // console.log( granted, "granted" );
        } else {
          this.setError( "permissions" );
        }
      } catch ( e ) {
        this.setError( "permissions" );
      }
    }
  }

  requestCameraRollPermissions = async ( photo ) => {
    if ( Platform.OS === "android" ) {
      const save = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      const retrieve = PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      try {
        const granted = await PermissionsAndroid.requestMultiple( [
          save,
          retrieve
        ] );
        if ( granted[save] === PermissionsAndroid.RESULTS.GRANTED ) {
          this.setImagePredictions( photo.predictions );
          this.savePhotoToGallery( photo );
          this.togglePreview();
        } else {
          this.setError( "cameraRoll" );
        }
      } catch ( e ) {
        this.setError( "cameraRoll" );
      }
    }
  }

  onResumePreview = () => {
    if ( this.camera ) {
      this.camera.resumePreview();
    }
  }

  takePicture = async () => {
    this.setLoading( true );
    if ( Platform.OS === "ios" ) {
      const CameraManager = NativeModules.INatCameraViewManager;
      if ( CameraManager ) {
        try {
          const photo = await CameraManager.takePictureAsync();
          this.setImagePredictions( photo.predictions );
          this.savePhotoToGallery( photo );
        } catch ( e ) {
          console.log( "error taking picture ", e );
        }
      }
    } else if ( Platform.OS === "android" ) {
      if ( this.camera ) {
        this.camera.takePictureAsync( {
          pauseAfterCapture: true
        } ).then( ( photo ) => {
          this.requestCameraRollPermissions( photo );
        } ).catch( ( err ) => {
          console.log( err, "Error taking photo" );
        } );
      }
    }
  }

  resetPredictions() {
    this.setState( {
      ranks: {},
      rankToRender: null
    } );
  }

  savePhotoToGallery( photo ) {
    CameraRoll.saveToCameraRoll( photo.uri, "photo" )
      .then( () => this.getCameraCaptureFromGallery() )
      .catch( ( err ) => {
        console.log( err, "error getting photo from gallery" );
      } );
  }

  navigateToResults( photo ) {
    const { predictions } = this.state;
    const { navigation } = this.props;

    navigation.push( "Results", {
      image: photo.image,
      time: photo.timestamp,
      latitude: null,
      longitude: null,
      predictions
    } );
  }

  render() {
    const {
      ranks,
      rankToRender,
      loading,
      pictureTaken,
      error,
      focusedScreen
    } = this.state;
    const { navigation } = this.props;

    let center;

    if ( error === "permissions" ) {
      center = (
        <View style={styles.loading}>
          <Text style={styles.errorText}>{i18n.t( "camera.error_camera" )}</Text>
        </View>
      );
    } else if ( error === "cameraRoll" ) {
      center = (
        <View style={styles.loading}>
          <Text style={styles.errorText}>{i18n.t( "camera.error_gallery" )}</Text>
        </View>
      );
    } else if ( loading ) {
      center = (
        <View style={styles.loading}>
          <LoadingWheel color="white" />
        </View>
      );
    } else {
      center = null;
    }

    return (
      <View style={styles.container}>
        {center}
        <NavigationEvents
          onWillFocus={() => {
            this.requestCameraPermissions();
            this.onResumePreview();
            this.setFocusedScreen( true );
          }}
          onWillBlur={() => {
            this.setError( null );
            this.setPictureTaken( false );
            this.setFocusedScreen( false );
          }}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate( "Main" )}
        >
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
        {( rankToRender !== "kingdom" && rankToRender !== "phylum" ) ? (
          <ARCameraHeader
            ranks={ranks}
            rankToRender={rankToRender}
          />
        ) : null}
        {!error ? <Text style={styles.scanText}>{i18n.t( "camera.scan" )}</Text> : null}
        {!pictureTaken ? (
          <TouchableOpacity
            onPress={() => {
              this.setPictureTaken( true );
              this.takePicture();
            }}
            style={styles.shutter}
          >
            {ranks && ranks.species
              ? <Image source={icons.arCameraGreen} />
              : <Image source={icons.arCameraButton} />}
          </TouchableOpacity>
        ) : (
          <View style={styles.shutter}>
            {ranks && ranks.species
              ? <Image source={icons.arCameraGreen} />
              : <Image source={icons.arCameraButton} />}
          </View>
        )}
        {!error ? (
          <TouchableOpacity
            onPress={() => navigation.navigate( "CameraHelp" )}
            style={styles.help}
          >
            <Image source={icons.cameraHelp} />
          </TouchableOpacity>
        ) : null}
        {focusedScreen ? (
          <INatCamera
            ref={( ref ) => {
              this.camera = ref;
            }}
            onTaxaDetected={this.onTaxaDetected}
            onCameraError={this.onCameraError}
            onCameraPermissionMissing={this.onCameraPermissionMissing}
            onClassifierError={this.onClassifierError}
            onDeviceNotSupported={this.onDeviceNotSupported}
            modelPath={Platform.OS === "ios" ? `${RNFS.DocumentDirectoryPath}/optimized-model.mlmodelc` : `${RNFS.DocumentDirectoryPath}/optimized-model.tflite`}
            taxonomyPath={Platform.OS === "ios" ? `${RNFS.DocumentDirectoryPath}/taxonomy.json` : `${RNFS.DocumentDirectoryPath}/taxonomy.csv`}
            taxaDetectionInterval={Platform.OS === "ios" ? 1000 : "1000"}
            confidenceThreshold={Platform.OS === "ios" ? 0.8 : "0.8"}
            style={styles.camera}
          />
        ) : null}
      </View>
    );
  }
}

export default ARCamera;
