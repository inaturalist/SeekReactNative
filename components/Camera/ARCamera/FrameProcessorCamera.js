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
  const devices = useCameraDevices();
  const device = devices.back;

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
      singleTapToFocus( e );
    } );

  const frameProcessor = useFrameProcessor( ( frame ) => {
    "worklet";
    // Reminder: this is a worklet, running on the UI thread.
    const results = inatVision( frame, props.modelPath, props.taxonomyPath, props.confidenceThreshold, props.filterByTaxonId, props.negativeFilter );
    REA.runOnJS( props.onTaxaDetected )( results );

    // Other props that have to be handled here:
    // onCameraError={handleCameraError}
    // onCameraPermissionMissing={handleCameraPermissionMissing}
    // onClassifierError={handleClassifierError}
    // onDeviceNotSupported={handleDeviceNotSupported}
    // onLog={handleLog}
    // type={cameraType}

    // Also needs to handle what this was used for in the legacy camera:
    // ref={camera}
  }, [] );

  const onError = useCallback( ( error: CameraRuntimeError ) => {
    console.error( error );
  }, [] );

  return (
    device && (
      <>
        <GestureDetector gesture={Gesture.Exclusive( singleTap )}>
          <Camera
            ref={props.cameraRef}
            style={styles.camera}
            enableZoomGesture
            photo={true}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            // A value of 1 indicates that the frame processor gets executed once per second.
            // This equals the setting of the legacy camera of 1000ms between predictions (taxaDetectionInterval).
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
