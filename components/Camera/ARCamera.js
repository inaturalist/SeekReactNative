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
  BackHandler
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { NavigationEvents } from "react-navigation";
import RNFS from "react-native-fs";
import INatCamera from "react-native-inat-camera";

import LoadingWheel from "../LoadingWheel";
import i18n from "../../i18n";
import styles from "../../styles/camera/arCamera";
import icons from "../../assets/icons";
import ARCameraHeader from "./ARCameraHeader";
import PermissionError from "./PermissionError";
import { getTaxonCommonName } from "../../utility/helpers";
import { checkCameraRollPermissions } from "../../utility/photoHelpers";

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
      commonName: null
    };
    this.backHandler = null;
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
    // const { rankToRender } = this.state;
    const predictions = Object.assign( {}, event.nativeEvent );

    // console.log( predictions, "predictions" );

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
        const prediction = predictions[rank][0];
        // if ( rankToRender === "species" ) {
        //   // this block keeps the last species seen displayed for 3 seconds
        //   console.log( "rank to render is species so setting timeout" );
        //   const saveLastSpecies = setTimeout( () => {
        //     console.log( "set timeout executing" );
        //     this.resetPredictions();
        //     this.updateUI( prediction, rank );
        //   }, 3000 );

        //   // unless there is a new species seen during those 3 seconds
        //   if ( predictions.species ) {
        //     console.log( "clearing timeout because a second species sighted" );
        //     clearTimeout( saveLastSpecies );
        //     this.updateUI( prediction, rank );
        //   }
        // } else {
        //   console.log( "rank NOT species so predicting normally" );
        this.updateUI( prediction, rank );
      }
      // }
      if ( !predictionSet ) {
        this.resetPredictions();
      }
    } );
  }

  onCameraError = ( event ) => {
    if ( event ) {
      this.setError( "permissions" );
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

  requestCameraPermissions = async () => {
    if ( Platform.OS === "android" ) {
      const camera = PermissionsAndroid.PERMISSIONS.CAMERA;

      try {
        const granted = await PermissionsAndroid.request( camera );
        if ( granted === PermissionsAndroid.RESULTS.GRANTED ) {
          this.requestCameraRollPermissions();
        } else {
          this.setError( "permissions" );
        }
      } catch ( e ) {
        this.setError( "permissions" );
      }
    }
  }

  requestCameraRollPermissions = async () => {
    const permission = await checkCameraRollPermissions();
    if ( permission === true ) {
      // console.log( permission, "permission granted" );
    } else {
      this.setError( "save" );
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
          this.savePhotoToGallery( photo );
        } ).catch( () => {
          this.setError( "save" );
        } );
      }
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
      }, () => console.log( this.state.rankToRender, "rank to render" ) );
    } );
  }

  resetPredictions() {
    this.setState( {
      ranks: {},
      rankToRender: null,
      commonName: null
    } );
  }

  savePhotoToGallery( photo ) {
    this.setImagePredictions( photo.predictions );

    CameraRoll.saveToCameraRoll( photo.uri, "photo" )
      .then( uri => this.navigateToResults( uri ) )
      .catch( () => this.setError( "save" ) );
  }

  navigateToResults( uri ) {
    const { predictions } = this.state;
    const { navigation } = this.props;

    if ( predictions && predictions.length > 0 ) {
      navigation.navigate( "ARCameraResults", {
        uri,
        predictions
      } );
    } else {
      navigation.navigate( "GalleryResults", {
        uri,
        time: null,
        latitude: null,
        longitude: null
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

    let errorText;

    if ( error === "permissions" ) {
      errorText = i18n.t( "camera.error_camera" );
    } else if ( error === "classifier" ) {
      errorText = i18n.t( "camera.error_classifier" );
    } else if ( error === "device" ) {
      errorText = i18n.t( "camera.device_support" );
    } else if ( error === "save" ) {
      errorText = i18n.t( "camera.error_gallery" );
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
          onWillFocus={() => {
            this.requestCameraPermissions();
            this.onResumePreview();
            this.setFocusedScreen( true );
            this.addListenerForAndroid();
          }}
          onWillBlur={() => {
            // this.resetPredictions();
            this.setError( null );
            this.setPictureTaken( false );
            this.setFocusedScreen( false );
            this.closeCameraAndroid();
          }}
        />
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
          style={styles.backButton}
          hitSlop={styles.touchable}
          onPress={() => this.closeCamera() }
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
