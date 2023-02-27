// @flow

import React from "react";
import { StyleSheet } from "react-native";
import {
    Camera,
    useCameraDevices,
    useFrameProcessor
} from "react-native-vision-camera";
import * as REA from "react-native-reanimated";

import { inatVision } from "vision-camera-plugin-inatvision";

import type { Node } from "react";

const FrameProcessorCamera = ( props ): Node => {
  const devices = useCameraDevices();
  const device = devices.back;

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
        photo={true}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
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
