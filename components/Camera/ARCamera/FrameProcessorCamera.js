// @flow

import React, { useCallback, useRef, useState, useEffect } from "react";
import { Animated, StyleSheet } from "react-native";
import {
    Camera,
    useCameraDevices,
    useFrameProcessor
} from "react-native-vision-camera";
import * as REA from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import * as InatVision from "vision-camera-plugin-inatvision";

import FocusSquare from "./FocusSquare";

import type { Node } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useIsForeground } from "../../../utility/customHooks";

const FrameProcessorCamera = ( props ): Node => {
  const {
    cameraRef,
    modelPath,
    taxonomyPath,
    confidenceThreshold,
    filterByTaxonId,
    negativeFilter,
    onTaxaDetected,
    onCameraError,
    onDeviceNotSupported,
    onClassifierError,
    onCaptureError,
    onLog,
    isActive,
    cameraLoaded,
    pictureTaken,
    speciesTimeoutSet
  } = props;

  const isFocused = useIsFocused( );
  const isForeground = useIsForeground( );

  // Currently, we are asking for camera permission on focus of the screen, that results in one render
  // of the camera before permission is granted. This is to keep track and to throw error after the first error only.
  const [permissionCount, setPermissionCount] = useState( 0 );
  const [focusAvailable, setFocusAvailable] = useState( true );
  const devices = useCameraDevices();
  let device = devices.back;
  // If there is no back camera, use the front camera
  if ( !device ) {
    device = devices.front;
  }

  useEffect( () => {
    InatVision.addLogListener( ( event ) => {
      // The vision-plugin events are in this format { log: "string" }
      // The ARCamera component expects events in this format { nativeEvent: { log: "string" } }
      const returnEvent = {
        nativeEvent: event
      };
      onLog( returnEvent );
    } );

    return () => {
      InatVision.removeLogListener();
    };
  }, [onLog] );

  const [tappedCoordinates, setTappedCoordinates] = useState( null );
  const singleTapToFocusAnimation = useRef( new Animated.Value( 0 ) ).current;

  const singleTapToFocus = async ( { x, y } ) => {
    if ( !device.supportsFocus ) {
      return;
    }
    try {
      singleTapToFocusAnimation.setValue( 1 );
      setTappedCoordinates( { x, y } );
      await props.cameraRef.current.focus( { x, y } );
    } catch ( e ) {
      // Android often catches the following error from the Camera X library
      // but it doesn't seem to affect functionality, so we're ignoring this error
      // and throwing other errors
      const startFocusError = e?.message?.includes(
        "Cancelled by another startFocusAndMetering"
      );
      if ( !startFocusError ) {
        throw e;
      }
    }
  };

  const singleTap = Gesture.Tap()
    .runOnJS( true )
    .maxDuration( 250 )
    .numberOfTaps( 1 )
    .onStart( ( e ) => {
      focusAvailable ? singleTapToFocus( e ) : null;
    } );

  const frameProcessor = useFrameProcessor(
    ( frame ) => {
      "worklet";
      // Reminder: this is a worklet, running on the UI thread.
      try {
        const results = InatVision.inatVision(
          frame,
          modelPath,
          taxonomyPath,
          confidenceThreshold,
          filterByTaxonId,
          negativeFilter
        );
        REA.runOnJS( onTaxaDetected )(
          results,
          {
            cameraLoaded,
            pictureTaken,
            speciesTimeoutSet
          }
        );
      } catch ( classifierError ) {
        // TODO: needs to throw Exception in the native code for it to work here?
        // Currently the native side throws RuntimeException but that doesn't seem to arrive here over he bridge
        console.log( `Error: ${classifierError.message}` );
        const returnError = {
          nativeEvent: { error: classifierError.message }
        };
        REA.runOnJS( onClassifierError )( returnError );
      }
      // ref={camera} was only used for takePictureAsync()
      // Johannes: I did a read though of the native code that is triggered when using ref.current.takePictureAsync()
      // and to me it seems everything should be handled by vision-camera itself. However, there is also some Exif and device orientation stuff going on.
      // related code that would need to be tested if it all is saved as expected.
    },
    [
      confidenceThreshold,
      filterByTaxonId,
      negativeFilter,
      cameraLoaded,
      pictureTaken,
      speciesTimeoutSet
    ]
  );

  const onError = useCallback(
    ( error: CameraRuntimeError ) => {
      console.log( "error", error );
      let returnString = error.code;
      // If there is no error code, log the error and return because we don't know what to do with it
      if ( !error.code ) {
        console.log( "Camera runtime error without error code:" );
        console.log( "error", error );
        return;
      }

      // If the error code is "device/focus-not-supported" disable focus
      if ( error.code === "device/focus-not-supported" ) {
        setFocusAvailable( false );
        return;
      }
      // If it is any other "device/" error, return the error code
      if ( error.code.includes( "device/" ) ) {
        const returnReason: { nativeEvent: { reason?: string } } = {
          nativeEvent: { reason: error.code }
        };
        onDeviceNotSupported( returnReason );
        return;
      }

      if ( error.code.includes( "capture/" ) ) {
        const returnError: { nativeEvent: { error?: string } } = {
          nativeEvent: { reason: error.code }
        };
        onCaptureError( returnError );
        return;
      }

      // If the error code is "frame-processor/unavailable" handle the error as classifier error
      if ( error.code === "frame-processor/unavailable" ) {
        const returnError: { nativeEvent: { error?: string } } = {
          nativeEvent: { error: error.code }
        };
        onClassifierError( returnError );
        return;
      }

      // If the error code is "permission/" return the legacy code for permission errors
      if ( error.code.includes( "permission/" ) ) {
        if ( error.code === "permission/camera-permission-denied" ) {
          // Currently, we are asking for camera permission on focus of the screen, that results in one render
          // of the camera before permission is granted. If the permission is denied, this error happens twice,
          // so we are ignoring the first one.
          if ( permissionCount === 0 ) {
            setPermissionCount( permissionCount + 1 );
            return;
          }
        }
        // This string is returned from the legacy camera when the user has not granted the needed permissions
        const permissions =
          "Camera Input Failed: This app is not authorized to use Back Camera.";
        returnString = permissions;
      }

      const returnError: { nativeEvent: { error?: string } } = {
        nativeEvent: { error: returnString }
      };
      onCameraError( returnError );
    },
    [permissionCount, onCameraError, onDeviceNotSupported, onClassifierError, onCaptureError]
  );

  return (
    device && (
      <>
        <GestureDetector gesture={Gesture.Exclusive( singleTap )}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            enableZoomGesture
            photo={true}
            device={device}
            isActive={isFocused && isForeground && isActive}
            frameProcessor={frameProcessor}
            // A value of 1 indicates that the frame processor gets executed once per second.
            // This roughly equals the setting of the legacy camera of 1000ms between predictions,
            // i.e. what taxaDetectionInterval was set to.
            frameProcessorFps={1}
            onError={onError}
          />
        </GestureDetector>
        <FocusSquare
          singleTapToFocusAnimation={singleTapToFocusAnimation}
          tappedCoordinates={tappedCoordinates}
        />
      </>
    )
  );
};

const styles = StyleSheet.create( {
  camera: {
    width: "100%",
    height: "100%",
    zIndex: -1
  }
} );

export default FrameProcessorCamera;
