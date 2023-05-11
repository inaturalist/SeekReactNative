// @flow

import React, { useCallback, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import {
    Camera,
    useCameraDevices,
    useFrameProcessor
} from "react-native-vision-camera";
import * as REA from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { inatVision } from "vision-camera-plugin-inatvision";

import FocusSquare from "./FocusSquare";

import type { Node } from "react";

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
    onClassifierError
  } = props;

  const [focusAvailable, setFocusAvailable] = useState( true );
  const devices = useCameraDevices();
  let device = devices.back;
  // If there is no back camera, use the front camera
  if ( !device ) {
    device = devices.front;
  }

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
      console.log( "filterByTaxonId", filterByTaxonId );
      console.log( "filterByTaxonId type", typeof filterByTaxonId );
      try {
        const results = inatVision(
          frame,
          modelPath,
          taxonomyPath,
          confidenceThreshold,
          filterByTaxonId,
          negativeFilter
        );
        REA.runOnJS( onTaxaDetected )( results );
      } catch ( classifierError ) {
        const returnError = {
          nativeEvent: { error: classifierError.message }
        };
        onClassifierError( returnError );
      }


      // Wrap with try catch to handle errors

      // Other props that have to be handled here:
      // onLog={handleLog}

      // Also needs to handle what this was used for in the legacy camera:
      // ref={camera}


      // Already partly handled below in onError
      // Communication with parent component is already implemented
      // onCameraError={handleCameraError}
      // onClassifierError={handleClassifierError}
      // onDeviceNotSupported={handleDeviceNotSupported}
    },
    [confidenceThreshold, filterByTaxonId, negativeFilter]
  );

  const onError = useCallback(
    ( error: CameraRuntimeError ) => {
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
        // returnString = "device";
        // TODO: check that error.code is the correct string to return
        const returnReason: { nativeEvent: { reason?: string } } = {
          nativeEvent: { reason: error.code }
        };
        onDeviceNotSupported( returnReason );
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
    [onCameraError, onDeviceNotSupported, onClassifierError]
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
            isActive={true}
            frameProcessor={frameProcessor}
            // A value of 1 indicates that the frame processor gets executed once per second.
            // This roughly equals the setting of the legacy camera of 1000ms between predictions (taxaDetectionInterval).
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
