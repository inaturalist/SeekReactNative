// @flow

import React from "react";
import { StyleSheet } from "react-native";
import {
    Camera,
    useCameraDevices,
} from "react-native-vision-camera";

import type { Node } from "react";

const FrameProcessorCamera = ( props ): Node => {
  const devices = useCameraDevices();
  const device = devices.back;


  return (
    device && (
      <Camera
        ref={props.cameraRef}
        style={styles.camera}
        photo={true}
        device={device}
        isActive={true}
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
