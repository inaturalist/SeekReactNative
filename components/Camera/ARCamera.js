// @flow

import React, { Component } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  Platform,
  NativeModules
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { NavigationEvents } from "react-navigation";
import { INatCamera } from "react-native-inat-camera";
import moment from "moment";

import LoadingWheel from "../UIComponents/LoadingWheel";
import WarningModal from "../Modals/WarningModal";
import i18n from "../../i18n";
import styles from "../../styles/camera/arCamera";
import icons from "../../assets/icons";
import ARCameraHeader from "./ARCameraHeader";
import CameraError from "./CameraError";
import { getTaxonCommonName, checkIfCameraLaunched } from "../../utility/helpers";
import { requestAllCameraPermissions } from "../../utility/androidHelpers.android";
import { dirModel, dirTaxonomy } from "../../utility/dirStorage";
import Modal from "../UIComponents/Modal";

type Props = {
  +navigation: any
}

type State = {
  ranks: Object,
  rankToRender: ?string,
  loading: boolean,
  predictions: Array<Object>,
  pictureTaken: boolean,
  error: ?string,
  commonName: ?string,
  showModal: boolean,
  errorEvent: ?string,
  focusedScreen: boolean
}

class ARCamera extends Component<Props, State> {
  camera: ?any

  constructor() {
    super();

    this.state = {
      ranks: {},
      rankToRender: null,
      loading: true,
      predictions: [],
      pictureTaken: false,
      error: null,
      commonName: null,
      showModal: false,
      errorEvent: null,
      focusedScreen: false
    };

    ( this:any ).closeModal = this.closeModal.bind( this );
  }

  setFocusedScreen( focusedScreen: boolean ) {
    this.setState( { focusedScreen } );
  }

  setPictureTaken() {
    this.setState( {
      loading: true,
      pictureTaken: true
    } );
  }

  setImagePredictions( predictions: Object ) {
    this.setState( { predictions } );
  }

  setLoading( loading: boolean ) {
    this.setState( { loading } );
  }

  setError( error: ?string, event: Object ) {
    this.setState( {
      error,
      errorEvent: event || null,
      loading: false
    } );
  }

  handleTaxaDetected = ( event: Object ) => {
    const { rankToRender, loading, pictureTaken } = this.state;
    const predictions = { ...event.nativeEvent };

    if ( pictureTaken ) {
      return;
    }

    if ( predictions && loading === true ) {
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

  handleCameraError = ( event: Object ) => {
    if ( event ) {
      if ( Platform.OS === "ios" ) {
        this.setError( "camera", event.nativeEvent.error );
      } else {
        this.setError( "camera" );
      }
    }
  }

  handleCameraPermissionMissing = () => {
    this.setError( "permissions" );
  }

  handleClassifierError = ( event: Object ) => {
    if ( event ) {
      this.setError( "classifier" );
    }
  }

  handleDeviceNotSupported = ( event: Object ) => {
    if ( event ) {
      this.setError( "device" );
    }
  }

  handleResumePreview = () => {
    if ( this.camera ) {
      this.camera.resumePreview();
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
          this.setError( "save", e );
        }
      }
    } else if ( Platform.OS === "android" ) {
      if ( this.camera ) {
        this.camera.takePictureAsync( {
          pauseAfterCapture: true
        } ).then( ( photo ) => {
          this.savePhoto( photo );
        } ).catch( e => this.setError( "save", e ) );
      }
    }
  }

  async checkForCameraLaunch() {
    const isFirstCameraLaunch = await checkIfCameraLaunched();
    if ( isFirstCameraLaunch ) {
      this.openModal();
    }
  }

  updateUI( prediction: Object, rank: string ) {
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
      commonName: null,
      pictureTaken: false
    } );
  }

  savePhoto( photo: Object ) {
    this.setImagePredictions( photo.predictions );

    CameraRoll.saveToCameraRoll( photo.uri, "photo" )
      .then( uri => this.navigateToResults( uri ) )
      .catch( e => this.setError( "save", e ) );
  }

  navigateToResults( uri: string ) {
    const { predictions } = this.state;
    const { navigation } = this.props;

    const results = {
      time: moment().format( "X" ), // add current time to AR camera photos,
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

  closeCamera() {
    const { navigation } = this.props;

    navigation.navigate( "Main" );
  }

  openModal() {
    this.setState( { showModal: true } );
  }

  closeModal() {
    this.setState( { showModal: false } );
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
      rankToRender,
      loading,
      pictureTaken,
      error,
      commonName,
      showModal,
      errorEvent,
      focusedScreen
    } = this.state;
    const { navigation } = this.props;

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
          onDidFocus={() => this.checkForCameraLaunch()}
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
        <Modal
          showModal={showModal}
          closeModal={this.closeModal}
          modal={<WarningModal closeModal={this.closeModal} />}
        />
        {loading ? (
          <View style={styles.loading}>
            <LoadingWheel color="white" />
          </View>
        ) : null}
        {error ? <CameraError error={error} errorEvent={errorEvent} /> : null}
        <TouchableOpacity
          accessibilityLabel={i18n.t( "accessibility.back" )}
          accessible
          onPress={() => this.closeCamera()}
          style={styles.backButton}
        >
          <Image source={icons.closeWhite} />
        </TouchableOpacity>
        {!error ? (
          <>
            <ARCameraHeader
              commonName={commonName}
              ranks={ranks}
              rankToRender={rankToRender}
            />
            <Text style={styles.scanText}>{helpText}</Text>
            {!pictureTaken ? (
              <TouchableOpacity
                accessibilityLabel={i18n.t( "accessibility.take_photo" )}
                accessible
                onPress={() => {
                  this.setPictureTaken();
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
            <TouchableOpacity
              accessibilityLabel={i18n.t( "accessibility.help" )}
              accessible
              onPress={() => navigation.navigate( "CameraHelp" )}
              style={styles.help}
            >
              <Image source={icons.cameraHelp} />
            </TouchableOpacity>
          </>
        ) : null}
        {focusedScreen ? ( // this is necessary for handleResumePreview to work properly in iOS
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
            style={styles.camera}
            taxaDetectionInterval={Platform.OS === "ios" ? 1000 : "1000"}
            taxonomyPath={dirTaxonomy}
          />
        ) : null}
      </View>
    );
  }
}

export default ARCamera;
