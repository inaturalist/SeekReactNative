// @flow

import React, {
  useReducer,
  useEffect,
  useRef,
  useCallback
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
import { getSystemVersion } from "react-native-device-info";

import i18n from "../../../i18n";
import styles from "../../../styles/camera/arCamera";
import icons from "../../../assets/icons";
import CameraError from "../CameraError";
import { writeToDebugLog } from "../../../utility/photoHelpers";
import { requestAllCameraPermissions } from "../../../utility/androidHelpers.android";
import { dirModel, dirTaxonomy } from "../../../utility/dirStorage";
import { createTimestamp } from "../../../utility/dateHelpers";
import ARCameraOverlay from "./ARCameraOverlay";
import { navigateToMainStack } from "../../../utility/helpers";

const ARCamera = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const camera = useRef<any>( null );

  // eslint-disable-next-line no-shadow
  const [state, dispatch] = useReducer( ( state, action ) => {
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
        return { ...state, negativeFilter: action.negativeFilter, taxonId: action.taxonId };
      case "ERROR":
        return { ...state, error: action.error, errorEvent: action.errorEvent };
      default:
        throw new Error();
    }
  }, {
    ranks: {},
    error: null,
    errorEvent: null,
    pictureTaken: false,
    cameraLoaded: false,
    negativeFilter: false,
    taxonId: null
  } );

  const {
    ranks,
    error,
    errorEvent,
    pictureTaken,
    cameraLoaded,
    negativeFilter,
    taxonId
  } = state;

  const rankToRender = Object.keys( ranks )[0] || null;

  const updateError = useCallback( ( err, errEvent ) => {
    dispatch( { type: "ERROR", error: err, errorEvent: errEvent } );
  }, [] );

  const navigateToResults = useCallback( ( uri, predictions ) => {
    const image = {
      time: createTimestamp(), // add current time to AR camera photos
      uri,
      predictions
    };

    navigation.navigate( "OfflineARResults", { image } );
  }, [navigation] );

  const resetPredictions = () => {
    // only rerender if state has different values than before
    if ( Object.keys( ranks ).length > 0 ) {
      dispatch( { type: "RESET_RANKS" } );
    }
  };

  const savePhoto = useCallback( ( photo ) => {
    CameraRoll.save( photo.uri, { type: "photo", album: "Seek" } )
      .then( uri => navigateToResults( uri, photo.predictions ) )
      .catch( e => {
        const gallery = "Error: Access to photo library was denied";

        if ( e.toString() === gallery ) {
          // check for camera roll permissions error
          updateError( "gallery" );
        } else {
          updateError( "save", e );
        }
      } );
  }, [navigateToResults, updateError] );

  const filterByTaxonId = useCallback( ( id, filter ) => {
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
      setTimeout( () => resetPredictions(), 2500 );
    } else {
      ["species", "genus", "family", "order", "class"].forEach( ( rank ) => {
        // skip this block if a prediction state has already been set
        if ( predictionSet ) { return; }
        if ( predictions[rank] ) {
          predictionSet = true;
          const prediction = predictions[rank][0];

          dispatch( { type: "SET_RANKS", ranks: { [rank]: [prediction] } } );
        }
        if ( !predictionSet ) {
          resetPredictions();
        }
      } );
    }
  };

  const handleCameraError = ( event ) => {
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
  const handleCameraPermissionMissing = () => updateError( "permissions" );

  const handleClassifierError = ( event ) => {
    if ( event.nativeEvent && event.nativeEvent.error ) {
      updateError( "classifier", event.nativeEvent.error );
    } else {
      updateError( "classifier" );
    }
  };

  const handleDeviceNotSupported = ( event ) => {
    let textOS;

    if ( Platform.OS === "ios" ) {
      const OS = getSystemVersion();
      textOS = i18n.t( "camera.error_version", { OS } );
    }

    if ( event.nativeEvent && event.nativeEvent.error ) {
      updateError( "device", event.nativeEvent.error );
    } else {
      updateError( "device", textOS );
    }
  };

  const handleLog = ( event ) => {
    if ( Platform.OS === "android" ) {
      writeToDebugLog( event.nativeEvent.log );
    }
  };

  const takePicture = useCallback( async () => {
    dispatch( { type: "PHOTO_TAKEN" } );

    if ( Platform.OS === "ios" ) {
      const CameraManager = NativeModules.INatCameraViewManager;
      if ( CameraManager ) {
        try {
          const photo = await CameraManager.takePictureAsync();
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
          savePhoto( photo );
        } ).catch( e => updateError( "take", e ) );
      }
    }
  }, [savePhoto, updateError] );

  const resetState = () => dispatch( { type: "RESET_STATE" } );

  const requestAndroidPermissions = useCallback( () => {
    if ( Platform.OS === "android" ) {
      requestAllCameraPermissions().then( ( result ) => {
        updateError( result );
      } ).catch( e => console.log( e, "couldn't get camera permissions" ) );
    }
  }, [updateError] );

  useEffect( () => {
    navigation.addListener( "focus", () => requestAndroidPermissions() );

    navigation.addListener( "blur", () => resetState() );
  }, [navigation, requestAndroidPermissions] );

  return (
    <View style={styles.container}>
      {error && <CameraError error={error} errorEvent={errorEvent} />}
      <TouchableOpacity
        accessibilityLabel={i18n.t( "accessibility.back" )}
        accessible
        onPress={() => navigateToMainStack( navigation.navigate, "Home" )}
        style={styles.backButton}
      >
        <Image source={icons.closeWhite} />
      </TouchableOpacity>
      <ARCameraOverlay
        ranks={ranks}
        pictureTaken={pictureTaken}
        takePicture={takePicture}
        cameraLoaded={cameraLoaded}
        error={error}
        filterByTaxonId={filterByTaxonId}
      />
      {isFocused && ( // this is necessary for camera to load properly in iOS
        <INatCamera
          ref={camera}
          confidenceThreshold={Platform.OS === "ios" ? 0.7 : "0.7"}
          modelPath={dirModel}
          onCameraError={handleCameraError}
          onCameraPermissionMissing={handleCameraPermissionMissing}
          onClassifierError={handleClassifierError}
          onDeviceNotSupported={handleDeviceNotSupported}
          onTaxaDetected={handleTaxaDetected}
          onLog={handleLog}
          style={styles.camera}
          taxaDetectionInterval={Platform.OS === "ios" ? 1000 : "1000"}
          taxonomyPath={dirTaxonomy}
          // filterByTaxonId="47126"
          // negativeFilter={false}
          filterByTaxonId={taxonId}
          negativeFilter={negativeFilter}
        />
      )}
    </View>
  );
};

export default ARCamera;
