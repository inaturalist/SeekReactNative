// @flow

import React, {
  useState,
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
import { useNavigation, useIsFocused, useRoute } from "@react-navigation/native";
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

const ARCamera = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const isFocused = useIsFocused();
  const camera = useRef<any>( null );
  const [ranks, setRanks] = useState( {} );
  const [error, setError] = useState( null );
  const [errorEvent, setErrorEvent] = useState( null );
  const [pictureTaken, setPictureTaken] = useState( false );
  const [cameraLoaded, setCameraLoaded] = useState( false );

  console.log( params, "params" );

  const updateError = useCallback( ( err, errEvent ) => {
    setError( err );
    setErrorEvent( errEvent );
  }, [] );

  const navigateToResults = ( uri, predictions ) => {
    const image = {
      time: createTimestamp(), // add current time to AR camera photos
      uri
    };

    if ( predictions && predictions.length > 0 ) {
      // $FlowFixMe
      image.predictions = predictions;

      navigation.navigate( "OfflineARResults", { image } );
    } else {
      navigation.navigate( "OnlineServerResults", { image } );
    }
  };

  const resetPredictions = () => {
    // only rerender if state has different values than before
    if ( Object.keys( ranks ).length > 0 ) {
      setRanks( {} );
    }
  };

  const savePhoto = ( photo ) => {
    CameraRoll.saveToCameraRoll( photo.uri, "photo" )
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
  };

  const handleTaxaDetected = ( event ) => {
    const predictions = { ...event.nativeEvent };
    const rankToRender = Object.keys( ranks )[0] || null;

    if ( pictureTaken ) { return; }

    if ( predictions && !cameraLoaded ) {
      setCameraLoaded( true );
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

          setRanks( { [rank]: [prediction] } );
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

  const handleCameraPermissionMissing = () => {
    // event.nativeEvent.error is not implemented on Android
    // it shows up via handleCameraError on iOS
    updateError( "permissions" );
  };

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

  const takePicture = async () => {
    setPictureTaken( true );

    if ( Platform.OS === "ios" ) {
      const CameraManager = NativeModules.INatCameraViewManager;
      if ( CameraManager ) {
        try {
          const photo = await CameraManager.takePictureAsync();
          savePhoto( photo );
        } catch ( e ) {
          updateError( "take", e );
        }
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
  };

  const resetState = () => {
    setPictureTaken( false );
    setRanks( {} );
    setError( null );
  };

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
        onPress={() => navigation.navigate( "MainTab", { screen: "Home" } )}
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
        />
      )}
    </View>
  );
};

export default ARCamera;
