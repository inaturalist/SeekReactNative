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
  CameraRoll
} from "react-native";
import { NavigationEvents } from "react-navigation";
import Realm from "realm";
import RNFS from "react-native-fs";

import INatCamera from "react-native-inat-camera";

import realmConfig from "../../models/index";
import ErrorScreen from "./ErrorScreen";
import LoadingWheel from "../LoadingWheel";
import i18n from "../../i18n";
import styles from "../../styles/camera/arCamera";
import icons from "../../assets/icons";
import ARCameraHeader from "./ARCameraHeader";
import { capitalizeNames } from "../../utility/helpers";

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
      focusedScreen: false,
      taxonId: null,
      commonName: null
    };
  }

  setCommonName( commonName ) {
    this.setState( { commonName } );
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
    this.setLoading( false );
    this.setState( { error } );
  }

  onTaxaDetected = ( event ) => {
    const predictions = Object.assign( {}, event.nativeEvent );

    if ( predictions ) {
      this.setLoading( false );
    }
    let predictionSet = false;
    // not looking at kingdom or phylum as we are currently not displaying results for those ranks
    ["species", "genus", "family", "order", "class"].forEach( ( rank ) => {
      // skip this block if a prediction state has already been set
      if ( predictionSet ) { return; }
      if ( predictions[rank] ) {
        predictionSet = true;
        Realm.open( realmConfig )
          .then( ( realm ) => {
            const searchLocale = i18n.currentLocale( ).split( "-" )[0].toLowerCase( );
            const prediction = predictions[rank][0];
            // look up common names for the predicted taxon in the current locale
            const commonNames = realm.objects( "CommonNamesRealm" )
              .filtered( `taxon_id == ${prediction.taxon_id} and locale == '${searchLocale}'` );
            this.setState( {
              ranks: {
                [rank]: [prediction]
              },
              commonName: commonNames.length > 0 ? capitalizeNames( commonNames[0].name ) : null,
              rankToRender: rank,
              taxonId: prediction.taxon_id
            } );
          } ).catch( ( err ) => {
            console.log( "[DEBUG] Failed to open realm, error: ", err );
          } );
      }
    } );
    if ( !predictionSet ) {
      this.resetPredictions( );
    }
  }

  onCameraError = ( event ) => {
    this.setError( "camera" );
  }

  onCameraPermissionMissing = () => {
    this.setError( "permissions" );
  }

  onClassifierError = ( event ) => {
    this.setError( "classifier" );
  }

  onDeviceNotSupported = ( event ) => {
    this.setError( "device" );
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
        this.setError( null );
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
          this.setError( "save" );
        }
      }
    } else if ( Platform.OS === "android" ) {
      if ( this.camera ) {
        this.camera.takePictureAsync( {
          pauseAfterCapture: true
        } ).then( ( photo ) => {
          this.requestCameraRollPermissions( photo );
        } ).catch( () => {
          this.setError( "save" );
        } );
      }
    }
  }

  resetPredictions() {
    this.setState( {
      ranks: {},
      rankToRender: null,
      commonName: null,
      taxonId: null
    } );
  }

  savePhotoToGallery( photo ) {
    CameraRoll.saveToCameraRoll( photo.uri, "photo" )
      .then( () => this.getCameraCaptureFromGallery() )
      .catch( () => {
        this.setError( "fetch" );
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
      focusedScreen,
      commonName
    } = this.state;
    const { navigation } = this.props;

    let center;

    if ( error === "permissions" ) {
      center = <ErrorScreen errorText={i18n.t( "camera.error_camera" )} camera />;
    } else if ( error === "cameraRoll" ) {
      center = <ErrorScreen errorText={i18n.t( "camera.error_gallery" )} camera />;
    } else if ( error === "camera" ) {
      center = <ErrorScreen errorText={i18n.t( "camera.error_old_camera" )} camera />;
    } else if ( error === "classifier" ) {
      center = <ErrorScreen errorText={i18n.t( "camera.error_classifier" )} camera />;
    } else if ( error === "device" ) {
      center = <ErrorScreen errorText={i18n.t( "camera.device_support" )} camera />;
    } else if ( error === "save" ) {
      center = <ErrorScreen errorText={i18n.t( "camera.error_saving_photos" )} camera />;
    } else if ( error === "fetch" ) {
      center = <ErrorScreen errorText={i18n.t( "camera.error_fetching_photos" )} camera />;
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
          hitSlop={styles.touchable}
          onPress={() => navigation.navigate( "Main" )}
        >
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
        {( rankToRender !== "kingdom" && rankToRender !== "phylum" ) ? (
          <ARCameraHeader
            commonName={commonName}
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
            confidenceThreshold={Platform.OS === "ios" ? 0.7 : "0.7"}
            style={styles.camera}
          />
        ) : null}
      </View>
    );
  }
}

export default ARCamera;
