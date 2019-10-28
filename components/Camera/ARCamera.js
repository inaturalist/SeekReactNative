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
  BackHandler,
  Dimensions
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { NavigationEvents } from "react-navigation";
import RNFS from "react-native-fs";
import { INatCamera } from "react-native-inat-camera";
import RNModal from "react-native-modal";
import moment from "moment";

import LoadingWheel from "../UIComponents/LoadingWheel";
import WarningModal from "./WarningModal";
import i18n from "../../i18n";
import styles from "../../styles/camera/arCamera";
import icons from "../../assets/icons";
import ARCameraHeader from "./ARCameraHeader";
import PermissionError from "./PermissionError";
import { getTaxonCommonName, checkIfCameraLaunched } from "../../utility/helpers";
import { movePhotoToAppStorage, resizeImage } from "../../utility/photoHelpers";
import { fetchTruncatedUserLocation, checkLocationPermissions } from "../../utility/locationHelpers";
import { dirPictures } from "../../utility/dirStorage";

const { width } = Dimensions.get( "window" );

type Props = {
  +navigation: any
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
      focusedScreen: false,
      commonName: null,
      latitude: null,
      longitude: null,
      showWarningModal: false,
      errorCode: null,
      errorEvent: null
    };
    this.backHandler = null;
    this.toggleWarningModal = this.toggleWarningModal.bind( this );
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

  setError( error, event ) {
    this.setLoading( false );
    this.setState( {
      error,
      errorEvent: event || null
    } );
  }

  setLocationErrorCode( errorCode ) {
    this.setState( { errorCode } );
  }

  getGeolocation() {
    fetchTruncatedUserLocation().then( ( coords ) => {
      if ( coords ) {
        const { latitude, longitude } = coords;

        this.setState( {
          latitude,
          longitude
        } );
      }
    } ).catch( ( errorCode ) => {
      this.setLocationErrorCode( errorCode );
    } );
  }

  onTaxaDetected = ( event ) => {
    const { rankToRender } = this.state;
    const predictions = Object.assign( {}, event.nativeEvent );

    if ( predictions ) {
      this.setLoading( false );
    }
    let predictionSet = false;
    // not looking at kingdom or phylum as we are currently not displaying results for those ranks
    if ( rankToRender === "species" ) {
      // this block keeps the last species seen displayed for 2.5 seconds
      setTimeout( () => {
        this.resetPredictions();
      }, 2500 );
    } else {
      ["species", "genus", "family", "order", "class"].forEach( ( rank ) => {
        // skip this block if a prediction state has already been set
        if ( predictionSet ) { return; }
        if ( predictions[rank] ) {
          predictionSet = true;
          const prediction = predictions[rank][0];

          this.updateUI( prediction, rank );
        }
        if ( !predictionSet ) {
          this.resetPredictions();
        }
      } );
    }
  }

  onCameraError = ( event ) => {
    if ( event ) {
      if ( Platform.OS === "ios" ) {
        this.setError( "camera", event.nativeEvent.error );
      } else {
        this.setError( "camera" );
      }
    }
  }

  onCameraPermissionMissing = () => {
    this.setError( "permissions" );
  }

  onClassifierError = ( event ) => {
    if ( event ) {
      this.setError( "classifier" );
    }
  }

  onDeviceNotSupported = ( event ) => {
    if ( event ) {
      this.setError( "device" );
    }
  }

  requestAllCameraPermissions = async () => {
    const permissions = PermissionsAndroid.PERMISSIONS;
    const results = PermissionsAndroid.RESULTS;

    if ( Platform.OS === "android" ) {
      const camera = permissions.CAMERA;
      const cameraRollSave = permissions.WRITE_EXTERNAL_STORAGE;
      const cameraRollRetrieve = permissions.READ_EXTERNAL_STORAGE;

      try {
        const granted = await PermissionsAndroid.requestMultiple( [
          camera,
          cameraRollSave,
          cameraRollRetrieve
        ] );

        if ( granted[camera] !== results.GRANTED ) {
          this.setError( "permissions" );
        }

        if ( granted[cameraRollRetrieve] !== results.GRANTED ) {
          this.setError( "save" );
        }
      } catch ( e ) {
        this.setError( "camera" );
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
          this.savePhoto( photo );
        } catch ( e ) {
          this.setError( "save" );
        }
      }
    } else if ( Platform.OS === "android" ) {
      if ( this.camera ) {
        this.camera.takePictureAsync( {
          pauseAfterCapture: true
        } ).then( ( photo ) => {
          this.savePhoto( photo );
        } ).catch( () => {
          this.setError( "save" );
        } );
      }
    }
  }

  requestAndroidPermissions() {
    if ( Platform.OS === "android" ) {
      checkLocationPermissions().then( ( granted ) => {
        if ( granted ) {
          this.getGeolocation();
        } else {
          this.setLocationErrorCode( 1 );
        }
      } );
    } else {
      this.getGeolocation();
    }
  }

  async checkForCameraLaunch() {
    const isFirstCameraLaunch = await checkIfCameraLaunched();
    if ( isFirstCameraLaunch ) {
      this.toggleWarningModal();
    }
  }

  updateUI( prediction, rank ) {
    getTaxonCommonName( prediction.taxon_id ).then( ( commonName ) => {
      this.setState( {
        ranks: {
          [rank]: [prediction]
        },
        commonName,
        rankToRender: rank
      } );
    } );
  }

  resetPredictions() {
    this.setState( {
      ranks: {},
      rankToRender: null,
      commonName: null
    } );
  }

  resizeImageForBackup( uri ) {
    resizeImage( uri, width, 250 ).then( ( resizedImage ) => {
      this.saveImageToAppDirectory( uri, resizedImage );
    } ).catch( () => this.navigateToResults( uri ) );
  }

  async saveImageToAppDirectory( uri, resizedImageUri ) {
    try {
      const newImageName = `${moment().format( "DDMMYY_HHmmSSS" )}.jpg`;
      const backupFilepath = `${dirPictures}/${newImageName}`;
      const imageMoved = await movePhotoToAppStorage( resizedImageUri, backupFilepath );

      if ( imageMoved ) {
        this.navigateToResults( uri, backupFilepath );
      } else {
        this.setError( "save" );
      }
    } catch ( error ) {
      this.setError( "save" );
    }
  }

  savePhoto( photo ) {
    this.setImagePredictions( photo.predictions );

    CameraRoll.saveToCameraRoll( photo.uri, "photo" )
      .then( uri => this.resizeImageForBackup( uri ) )
      .catch( () => this.setError( "save" ) );
  }

  navigateToResults( uri, backupUri ) {
    const {
      predictions,
      latitude,
      longitude,
      errorCode
    } = this.state;
    const { navigation } = this.props;

    if ( predictions && predictions.length > 0 ) {
      navigation.navigate( "ARCameraResults", {
        uri,
        predictions,
        latitude,
        longitude,
        backupUri,
        errorCode
      } );
    } else {
      navigation.navigate( "GalleryResults", {
        uri,
        time: null,
        latitude,
        longitude,
        backupUri,
        errorCode
      } );
    }
  }

  async closeCamera() {
    const { navigation } = this.props;
    if ( Platform.OS === "android" ) {
      if ( this.camera ) {
        await this.camera.stopCamera();
      }
    }

    navigation.navigate( "Main" );
  }

  addListenerForAndroid() {
    if ( Platform.OS === "android" ) {
      this.backHandler = BackHandler.addEventListener( "hardwareBackPress", () => {
        this.closeCamera();
        return true;
      } );
    }
  }

  closeCameraAndroid() {
    if ( Platform.OS === "android" ) {
      this.backHandler.remove();
    }
  }

  toggleWarningModal() {
    const { showWarningModal } = this.state;
    this.setState( { showWarningModal: !showWarningModal } );
  }

  render() {
    const {
      ranks,
      rankToRender,
      loading,
      pictureTaken,
      error,
      focusedScreen,
      commonName,
      showWarningModal,
      errorEvent
    } = this.state;
    const { navigation } = this.props;

    let errorText;

    if ( error === "permissions" ) {
      errorText = i18n.t( "camera.error_camera" );
    } else if ( error === "classifier" ) {
      errorText = i18n.t( "camera.error_classifier" );
    } else if ( error === "device" ) {
      errorText = i18n.t( "camera.device_support" );
    } else if ( error === "save" ) {
      errorText = i18n.t( "camera.error_gallery" );
    } else if ( error === "camera" && Platform.OS === "ios" ) {
      errorText = `${i18n.t( "camera.error_old_camera" )}: ${errorEvent}`;
    } else if ( error === "camera" ) {
      i18n.t( "camera.error_old_camera" );
    }

    let helpText;

    if ( rankToRender === "class" || rankToRender === "order" || rankToRender === "family" ) {
      helpText = i18n.t( "camera.scan_class" );
    } else if ( rankToRender === "genus" ) {
      helpText = i18n.t( "camera.scan_genus" );
    } else if ( rankToRender === "species" ) {
      helpText = i18n.t( "camera.scan_species" );
    } else {
      helpText = i18n.t( "camera.scan" );
    }

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillBlur={() => {
            this.resetPredictions();
            this.setError( null );
            this.setPictureTaken( false );
            this.setFocusedScreen( false );
            this.closeCameraAndroid();
          }}
          onWillFocus={() => {
            this.checkForCameraLaunch();
            this.requestAndroidPermissions(); // separate location from camera permissions
            this.requestAllCameraPermissions();
            this.onResumePreview();
            this.setFocusedScreen( true );
            this.addListenerForAndroid();
          }}
        />
        <RNModal
          isVisible={showWarningModal}
          onBackdropPress={() => this.toggleWarningModal()}
          onSwipeComplete={() => this.toggleWarningModal()}
          swipeDirection="down"
        >
          <WarningModal
            toggleWarningModal={this.toggleWarningModal}
          />
        </RNModal>
        {loading ? (
          <View style={styles.loading}>
            <LoadingWheel color="white" />
          </View>
        ) : null}
        {error && ( error === "save" || error === "permissions" )
          ? <PermissionError error={errorText} />
          : null}
        {error && error !== "save" && error !== "permissions"
          ? <Text style={styles.errorText}>{errorText}</Text>
          : null}
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.back" )}
          accessible
          hitSlop={styles.touchable}
          onPress={() => this.closeCamera() }
          style={styles.backButton}
        >
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
        {!error ? (
          <ARCameraHeader
            commonName={commonName}
            ranks={ranks}
            rankToRender={rankToRender}
          />
        ) : null}
        {!error ? <Text style={styles.scanText}>{helpText}</Text> : null}
        {!pictureTaken && !error ? (
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.take_photo" )}
            accessible
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
        ) : null}
        {pictureTaken && !error ? (
          <View style={styles.shutter}>
            {ranks && ranks.species
              ? <Image source={icons.arCameraGreen} />
              : <Image source={icons.arCameraButton} />}
          </View>
        ) : null}
        {!error ? (
          <TouchableOpacity
            accessibilityLabel={i18n.t( "accessibility.help" )}
            accessible
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
            confidenceThreshold={Platform.OS === "ios" ? 0.7 : "0.7"}
            modelPath={Platform.OS === "ios" ? `${RNFS.DocumentDirectoryPath}/optimized-model.mlmodelc` : `${RNFS.DocumentDirectoryPath}/optimized-model.tflite`}
            onCameraError={this.onCameraError}
            onCameraPermissionMissing={this.onCameraPermissionMissing}
            onClassifierError={this.onClassifierError}
            onDeviceNotSupported={this.onDeviceNotSupported}
            onTaxaDetected={this.onTaxaDetected}
            style={styles.camera}
            taxaDetectionInterval={Platform.OS === "ios" ? 1000 : "1000"}
            taxonomyPath={Platform.OS === "ios" ? `${RNFS.DocumentDirectoryPath}/taxonomy.json` : `${RNFS.DocumentDirectoryPath}/taxonomy.csv`}
          />
        ) : null}
      </View>
    );
  }
}

export default ARCamera;
