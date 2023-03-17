// @flow

import React from "react";
import { StyleSheet } from "react-native";
import {
    Camera,
    useCameraDevices,
    useFrameProcessor
} from "react-native-vision-camera";
import * as REA from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { inatVision } from "vision-camera-plugin-inatvision";

import type { Node } from "react";

const FrameProcessorCamera = ( props ): Node => {
  const devices = useCameraDevices();
  const device = devices.back;

  const singleTapToFocus = async ( { x, y } ) => {
    try {
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
    const results = inatVision( frame, props.modelPath, props.taxonomyPath );
    REA.runOnJS( props.onTaxaDetected )( results );

    // Other props that should be handled here:
    // onCameraError = { handleCameraError };
    // onClassifierError = { handleClassifierError };
    // onDeviceNotSupported = { handleDeviceNotSupported };
  }, [] );

  return (
    device && (
      <Camera
        ref={props.cameraRef}
        style={styles.camera}
        enableZoomGesture
        photo={true}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={1}
      />
        <GestureDetector gesture={Gesture.Exclusive( singleTap )}>
          <Camera
            ref={props.cameraRef}
            style={styles.camera}
            enableZoomGesture
            photo={true}
            device={device}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={1}
          />
        </GestureDetector>
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
