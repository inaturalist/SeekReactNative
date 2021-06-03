// @flow

import React, {
  useReducer,
  useEffect,
  useRef,
  useCallback,
  useContext
} from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Platform,
  NativeModules
} from "react-native";
import CameraRoll from "@react-native-community/cameraroll";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { INatCamera } from "react-native-inat-camera";
import type { Node } from "react";

import i18n from "../../../i18n";
import styles from "../../../styles/camera/arCamera";
import icons from "../../../assets/icons";
import CameraError from "../CameraError";
import {
  checkForSystemVersion,
  handleLog,
  showCameraSaveFailureAlert,
  checkForCameraAPIAndroid
} from "../../../utility/cameraHelpers";
import { checkCameraPermissions, checkSavePermissions } from "../../../utility/androidHelpers.android";
import { savePostingSuccess } from "../../../utility/loginHelpers";
import { dirModel, dirTaxonomy } from "../../../utility/dirStorage";
import { createTimestamp } from "../../../utility/dateHelpers";
import ARCameraOverlay from "./ARCameraOverlay";
import { resetRouter } from "../../../utility/navigationHelpers";
import { fetchImageLocationOrErrorCode } from "../../../utility/resultsHelpers";
import { checkIfCameraLaunched } from "../../../utility/helpers";
// import { useEmulator } from "../../../utility/customHooks";
import { colors } from "../../../styles/global";
import Modal from "../../UIComponents/Modals/Modal";
import WarningModal from "../../Modals/WarningModal";
import { ObservationContext, UserContext } from "../../UserContext";
// import { LOG } from "../../../utility/debugHelpers";

const ARCamera = ( ): Node => {
  const navigation = useNavigation( );
  const isFocused = useIsFocused( );
  const camera = useRef<any>( null );
  const { setObservation, observation } = useContext( ObservationContext );

  // determines whether or not to fetch untruncated coords or precise coords for posting to iNat
  const { login } = useContext( UserContext );

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
    // if (  action.type !== "SET_RANKS" && action.type !== "RESET_RANKS" ) {
    //   LOG.info( `AR Camera: ${action.type} - ${JSON.stringify( state )} - isFocused: ${isFocused}` );
    // }
    switch ( action.type ) {
      case "CAMERA_LOADED":
        return { ...state, cameraLoaded: true };
      case "RESET_RANKS":
        return { ...state, ranks: {} };
      case "SET_RANKS":
        return { ...state, ranks: action.ranks };
      case "PHOTO_TAKEN":
        return { ...state, pictureTaken: true };
      case "RESET_STATE":
        return {
          ...state,
          pictureTaken: false,
          error: null,
          ranks: {}
        };
      case "FILTER_TAXON":
        return {
          ...state,
          negativeFilter: action.negativeFilter,
          taxonId: action.taxonId,
          pictureTaken: false,
          error: null,
          ranks: {}
        };
      case "SHOW_FRONT_CAMERA":
        return { ...state, cameraType: action.cameraType };
      case "ERROR":
        return { ...state, error: action.error, errorEvent: action.errorEvent };
      case "SHOW_MODAL":
        return { ...state, showModal: true };
      case "CLOSE_MODAL":
        return { ...state, showModal: false };
      default:
        throw new Error( );
    }
  }, {
    ranks: {},
    error: null,
    errorEvent: null,
    pictureTaken: false,
    cameraLoaded: false,
    negativeFilter: false,
    taxonId: null,
    cameraType: "back",
    showModal: false
  } );

  const {
    ranks,
    error,
    errorEvent,
    pictureTaken,
    cameraLoaded,
    negativeFilter,
    taxonId,
    cameraType,
    showModal
  } = state;

  const rankToRender = Object.keys( ranks )[0] || null;

  const updateError = useCallback( ( err, errEvent?: string ) => {
    // don't update error on first camera load
    if ( err === null && error === null ) {
      return;
    }
    dispatch( { type: "ERROR", error: err, errorEvent: errEvent } );
  }, [error] );

  const navigateToResults = useCallback( async ( uri, predictions ) => {
    const userImage = {
      time: createTimestamp( ), // add current time to AR camera photos
      uri,
      predictions
    };

    // AR camera photos don't come with a location
    // especially when user has location permissions off
    // this is also needed for ancestor screen, species nearby
    const { image, errorCode } = await fetchImageLocationOrErrorCode( userImage, login );
    image.errorCode = errorCode;
    image.arCamera = true;
    setObservation( { image } );
  }, [setObservation, login] );

  useEffect( ( ) => {
    if ( observation && observation.taxon && observation.image.arCamera ) {
      navigation.push( "Drawer", {
        screen: "Match"
      } );
    }
  }, [observation, navigation] );

  const resetPredictions = ( ) => {
    // only rerender if state has different values than before
    if ( Object.keys( ranks ).length > 0 ) {
      dispatch( { type: "RESET_RANKS" } );
    }
  };

  const handleCameraRollSaveError = useCallback( async ( uri, predictions, e ) => {
    // react-native-cameraroll does not yet have granular detail about read vs. write permissions
    // but there's a pull request for it as of March 2021

    // console.log( uri, "handling save error in AR camera" );

    await showCameraSaveFailureAlert( e, uri );
    navigateToResults( uri, predictions );
  }, [navigateToResults] );

  const savePhoto = useCallback( async ( photo: { uri: string, predictions: Array<Object> } ) => {
    // console.log( photo.uri, "saving photo in AR camera" );
    CameraRoll.save( photo.uri, { type: "photo", album: "Seek" } )
      .then( uri => navigateToResults( uri, photo.predictions ) )
      .catch( e => handleCameraRollSaveError( photo.uri, photo.predictions, e ) );
  }, [handleCameraRollSaveError, navigateToResults] );

  const filterByTaxonId = useCallback( ( id: number, filter: ?boolean ) => {
    dispatch( { type: "FILTER_TAXON", taxonId: id, negativeFilter: filter } );
  }, [] );

  const handleTaxaDetected = ( event ) => {
    const predictions = { ...event.nativeEvent };

    if ( pictureTaken ) { return; }

    if ( predictions && !cameraLoaded ) {
      dispatch( { type: "CAMERA_LOADED" } );
    }

    let predictionSet = false;
    // not looking at kingdom or phylum as we are currently not displaying results for those ranks
    if ( rankToRender === "species" ) {
      // this block keeps the last species seen displayed for 2.5 seconds
      setTimeout( ( ) => resetPredictions( ), 2500 );
    } else {
      ["species", "genus", "family", "order", "class"].forEach( ( rank: string ) => {
        // skip this block if a prediction state has already been set
        if ( predictionSet ) { return; }
        if ( predictions[rank] ) {
          predictionSet = true;
          const prediction = predictions[rank][0];

          //$FlowFixMe
          dispatch( { type: "SET_RANKS", ranks: { [rank]: [prediction] } } );
        }
        if ( !predictionSet ) {
          resetPredictions( );
        }
      } );
    }
  };

  const handleCameraError = ( event: { nativeEvent: { error?: string } } ) => {
    const permissions = "Camera Input Failed: This app is not authorized to use Back Camera.";
    // iOS camera permissions error is handled by handleCameraError, not permission missing
    if ( error === "device" ) {
      // do nothing if there is already a device error
      return;
    }

    if ( event.nativeEvent.error === permissions ) {
      updateError( "permissions" );
    } else {
      updateError( "camera", event.nativeEvent.error );
    }
  };

  // event.nativeEvent.error is not implemented on Android
  // it shows up via handleCameraError on iOS
  // ignoring this callback since we're checking all permissions in React Native
  const handleCameraPermissionMissing = ( ) => {};

  const handleClassifierError = ( event: { nativeEvent?: { error: string } } ) => {
    if ( event.nativeEvent && event.nativeEvent.error ) {
      updateError( "classifier", event.nativeEvent.error );
    } else {
      updateError( "classifier" );
    }
  };

  const handleDeviceNotSupported = ( event: { nativeEvent?: { reason: string } } ) => {
    if ( event.nativeEvent && event.nativeEvent.reason ) {
      updateError( "device", event.nativeEvent.reason );
    } else {
      updateError( "device", checkForSystemVersion( ) );
    }
  };

  const requestAndroidSavePermissions = useCallback( ( photo ) => {
    const checkPermissions = async ( ) => {
      const result = await checkSavePermissions( );

      if ( result === "gallery" ) {
        savePhoto( photo );
      } else {
        savePhoto( photo );
      }
    };
    // on Android, this permission check will pop up every time; on iOS it only pops up first time a user opens camera
    checkPermissions( );
  }, [savePhoto] );

  const takePicture = useCallback( async ( ) => {
    dispatch( { type: "PHOTO_TAKEN" } );

    if ( Platform.OS === "ios" ) {
      const CameraManager = NativeModules.INatCameraViewManager;
      if ( CameraManager ) {
        try {
          const photo = await CameraManager.takePictureAsync( );
          if ( typeof photo !== "object" ) {
            updateError( "photoError", photo );
          } else {
            savePhoto( photo );
          }
        } catch ( e ) {
          updateError( "take", e );
        }
      } else {
        updateError( "cameraManager" );
      }
    } else if ( Platform.OS === "android" ) {
      if ( camera.current ) {
        camera.current.takePictureAsync( {
          pauseAfterCapture: true
        } ).then( ( photo ) => {
          requestAndroidSavePermissions( photo );
        } ).catch( e => updateError( "take", e ) );
      }
    }
  }, [savePhoto, updateError, requestAndroidSavePermissions] );

  const resetState = ( ) => dispatch( { type: "RESET_STATE" } );

  const requestAndroidPermissions = useCallback( ( ) => {
    if ( Platform.OS === "android" ) {
      checkCameraPermissions( ).then( ( result ) => {
        if ( result === "permissions" ) {
          updateError( "permissions" );
        }
        updateError( null );
      } ).catch( e => console.log( e, "couldn't get camera permissions" ) );
    }
  }, [updateError] );

  const checkCameraHardware = async ( ) => {
    // the goal of this is to make Seek usable for Android devices
    // which lack a back camera, like most Chromebooks
    const cameraHardware = await checkForCameraAPIAndroid( );

    if ( cameraHardware === "front" ) {
      dispatch( { type: "SHOW_FRONT_CAMERA", cameraType: "front" } );
    }
  };

  const closeModal = useCallback( ( ) => dispatch( { type: "CLOSE_MODAL" } ), [] );

  useEffect( ( ) => {
    const checkForFirstCameraLaunch = async ( ) => {
      const isFirstLaunch = await checkIfCameraLaunched( );
      if ( isFirstLaunch ) {
        dispatch( { type: "SHOW_MODAL" } );
      }
    };

    navigation.addListener( "focus", ( ) => {
      setObservation( null );
      // LOG.info( "AR Camera: add navigation focus listener" );
      // reset when camera loads, not when leaving page, for quicker transition
      resetState( );
      checkForFirstCameraLaunch( );
      requestAndroidPermissions( );
      checkCameraHardware( );
      // reset posting to iNat
      savePostingSuccess( false );
    } );
  }, [navigation, requestAndroidPermissions, setObservation] );

  const navHome = ( ) => resetRouter( navigation );
  const navToSettings = ( ) => navigation.navigate( "Settings" );

  const confidenceThreshold = Platform.OS === "ios" ? 0.7 : "0.7";
  const taxaDetectionInterval = Platform.OS === "ios" ? 1000 : "1000";

  if ( !isFocused ) { // this is necessary for camera to load properly in iOS
    return null;
  }

  return (
    <View style={styles.container}>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        modal={<WarningModal closeModal={closeModal} />}
      />
      {error
        ? <CameraError error={error} errorEvent={errorEvent} />
        : (
          <ARCameraOverlay
            ranks={ranks}
            pictureTaken={pictureTaken}
            takePicture={takePicture}
            cameraLoaded={cameraLoaded}
            filterByTaxonId={filterByTaxonId}
          />
        )
      }
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.back" )}
        accessible
        onPress={navHome}
        style={styles.backButton}
      >
        <Image source={icons.closeWhite} />
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={i18n.t( "menu.settings" )}
        accessible
        onPress={navToSettings}
        style={styles.settingsButton}
      >
        {/* $FlowFixMe */}
        <Image
          tintColor={colors.white}
          style={styles.settingsIcon}
          source={icons.menuSettings}
        />
      </TouchableOpacity>
      <INatCamera
        ref={camera}
        confidenceThreshold={confidenceThreshold}
        modelPath={dirModel}
        onCameraError={handleCameraError}
        onCameraPermissionMissing={handleCameraPermissionMissing}
        onClassifierError={handleClassifierError}
        onDeviceNotSupported={handleDeviceNotSupported}
        onTaxaDetected={handleTaxaDetected}
        onLog={handleLog}
        style={styles.camera}
        taxaDetectionInterval={taxaDetectionInterval}
        taxonomyPath={dirTaxonomy}
        filterByTaxonId={taxonId}
        negativeFilter={negativeFilter}
        type={cameraType}
      />
    </View>
  );
};

export default ARCamera;
