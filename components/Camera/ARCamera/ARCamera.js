// @flow

import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Platform,
  NativeModules
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { NavigationEvents } from "react-navigation";
import { INatCamera } from "react-native-inat-camera";
import { getSystemVersion } from "react-native-device-info";

import i18n from "../../../i18n";
import styles from "../../../styles/camera/arCamera";
import icons from "../../../assets/icons";
import CameraError from "../CameraError";
import { getTaxonCommonName } from "../../../utility/helpers";
import { writeToDebugLog } from "../../../utility/photoHelpers";
import { requestAllCameraPermissions } from "../../../utility/androidHelpers.android";
import { dirModel, dirTaxonomy } from "../../../utility/dirStorage";
import { createTimestamp } from "../../../utility/dateHelpers";
import ARCameraOverlay from "./ARCameraOverlay";

type Props = {
  +navigation: any
}

type State = {
  ranks: Object,
  predictions: Array<Object>,
  pictureTaken: boolean,
  error: ?string,
  errorEvent: ?string,
  focusedScreen: boolean,
  cameraLoaded: boolean
}

class ARCamera extends Component<Props, State> {
  camera: ?any

  constructor() {
    super();

    this.state = {
      ranks: {},
      predictions: [],
      pictureTaken: false,
      error: null,
      errorEvent: null,
      focusedScreen: false,
      cameraLoaded: false
    };

    ( this:any ).setPictureTaken = this.setPictureTaken.bind( this );
    ( this:any ).takePicture = this.takePicture.bind( this );
  }

  setFocusedScreen( focusedScreen: boolean ) {
    this.setState( { focusedScreen } );
  }

  setPictureTaken() {
    this.setState( { pictureTaken: true } );
  }

  setImagePredictions( predictions: Object ) {
    this.setState( { predictions } );
  }

  setError( error: ?string, event: Object ) {
    this.setState( {
      error,
      errorEvent: event || null
    } );
  }

  handleTaxaDetected = ( event: Object ) => {
    const { ranks, pictureTaken } = this.state;
    const predictions = { ...event.nativeEvent };
    const rankToRender = Object.keys( ranks )[0] || null;

    if ( pictureTaken ) {
      return;
    }

    if ( predictions ) {
      this.setState( { cameraLoaded: true } );
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

  handleCameraError = ( event: Object ) => {
    const { error } = this.state;
    const permissions = "Camera Input Failed: This app is not authorized to use Back Camera.";
    // iOS camera permissions error is handled by handleCameraError, not permission missing
    if ( error === "device" ) {
      // do nothing if there is already a device error
      return;
    }

    if ( event.nativeEvent.error === permissions ) {
      this.setError( "permissions" );
    } else {
      this.setError( "camera", event.nativeEvent.error );
    }
  }

  handleCameraPermissionMissing = () => {
    // event.nativeEvent.error is not implemented on Android
    // it shows up via handleCameraError on iOS
    this.setError( "permissions" );
  }

  handleClassifierError = ( event: Object ) => {
    if ( event.nativeEvent && event.nativeEvent.error ) {
      this.setError( "classifier", event.nativeEvent.error );
    } else {
      this.setError( "classifier" );
    }
  }

  handleDeviceNotSupported = ( event: Object ) => {
    let textOS;

    if ( Platform.OS === "ios" ) {
      const OS = getSystemVersion();
      textOS = i18n.t( "camera.error_version", { OS } );
    }

    if ( event.nativeEvent && event.nativeEvent.error ) {
      this.setError( "device", event.nativeEvent.error );
    } else {
      this.setError( "device", textOS );
    }
  }

  handleResumePreview = () => {
    if ( this.camera ) {
      this.camera.resumePreview();
    }
  }

  handleLog = ( event: Object ) => {
    if ( Platform.OS === "android" ) {
      writeToDebugLog( event.nativeEvent.log );
    }
  }

  takePicture = async () => {
    if ( Platform.OS === "ios" ) {
      const CameraManager = NativeModules.INatCameraViewManager;
      if ( CameraManager ) {
        try {
          const photo = await CameraManager.takePictureAsync();
          this.savePhoto( photo );
        } catch ( e ) {
          this.setError( "take", e );
        }
      }
    } else if ( Platform.OS === "android" ) {
      if ( this.camera ) {
        this.camera.takePictureAsync( {
          pauseAfterCapture: true
        } ).then( ( photo ) => {
          this.savePhoto( photo );
        } ).catch( e => this.setError( "take", e ) );
      }
    }
  }

  updateUI( prediction: Object, rank: string ) {
    this.setState( {
      ranks: {
        [rank]: [prediction]
      }
    } );
  }

  resetPredictions() {
    const {
      ranks,
      pictureTaken
    } = this.state;
    if ( Object.keys( ranks ).length !== 0 || pictureTaken !== false ) {
      // only rerender if state has different values than before
      this.setState( {
        ranks: {},
        pictureTaken: false
      } );
    }
  }

  savePhoto( photo: Object ) {
    this.setImagePredictions( photo.predictions );

    CameraRoll.saveToCameraRoll( photo.uri, "photo" )
      .then( uri => this.navigateToResults( uri ) )
      .catch( e => {
        const gallery = "Error: Access to photo library was denied";

        if ( e.toString() === gallery ) {
          // check for camera roll permissions error
          this.setError( "gallery" );
        } else {
          this.setError( "save", e );
        }
      } );
  }

  navigateToResults( uri: string ) {
    const { predictions } = this.state;
    const { navigation } = this.props;

    const results = {
      time: createTimestamp(), // add current time to AR camera photos,
      uri
    };

    if ( predictions && predictions.length > 0 ) {
      // $FlowFixMe
      results.predictions = predictions;

      navigation.navigate( "OfflineARResults", results );
    } else {
      navigation.navigate( "OnlineServerResults", results );
    }
  }

  requestAndroidPermissions() {
    if ( Platform.OS === "android" ) {
      requestAllCameraPermissions().then( ( result ) => {
        this.setError( result );
      } ).catch( e => console.log( e, "couldn't get camera permissions" ) );
    }
  }

  render() {
    const {
      ranks,
      pictureTaken,
      error,
      errorEvent,
      focusedScreen,
      cameraLoaded
    } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <NavigationEvents
          onWillBlur={() => {
            this.resetPredictions();
            this.setError( null );
            this.setFocusedScreen( false );
          }}
          onWillFocus={() => {
            this.requestAndroidPermissions();
            this.handleResumePreview();
            this.setFocusedScreen( true );
          }}
        />
        {error && <CameraError error={error} errorEvent={errorEvent} />}
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.back" )}
          accessible
          onPress={() => navigation.navigate( "Main" )}
          style={styles.backButton}
        >
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
        {!error && (
          <ARCameraOverlay
            ranks={ranks}
            pictureTaken={pictureTaken}
            setPictureTaken={this.setPictureTaken}
            takePicture={this.takePicture}
            cameraLoaded={cameraLoaded}
          />
        )}
        {focusedScreen && ( // this is necessary for handleResumePreview to work properly in iOS
          <INatCamera
            ref={( ref ) => {
              this.camera = ref;
            }}
            confidenceThreshold={Platform.OS === "ios" ? 0.7 : "0.7"}
            modelPath={dirModel}
            onCameraError={this.handleCameraError}
            onCameraPermissionMissing={this.handleCameraPermissionMissing}
            onClassifierError={this.handleClassifierError}
            onDeviceNotSupported={this.handleDeviceNotSupported}
            onTaxaDetected={this.handleTaxaDetected}
            onLog={this.handleLog}
            style={styles.camera}
            taxaDetectionInterval={Platform.OS === "ios" ? 1000 : "1000"}
            taxonomyPath={dirTaxonomy}
          />
        )}
      </View>
    );
  }
}

export default ARCamera;
