import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, Platform, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import type { CameraRuntimeError } from "react-native-vision-camera";
import { Worklets } from "react-native-worklets-core";

import {
  useIsForeground,
  useLocationPermission,
  useTruncatedUserCoords
} from "../../../utility/customHooks";
import InatVision from "./helpers/visionPluginWrapper";
import { dirModel, dirGeomodel, dirTaxonomy } from "../../../utility/dirStorage";
import usePatchedRunAsync from "../../../utility/visionCameraPatches";

import {
  Camera,
  useCameraDevice,
  useCameraFormat,
  useFrameProcessor
} from "./helpers/visionCameraWrapper";
import FocusSquare from "./FocusSquare";
import useFocusTap from "./hooks/useFocusTap";

let framesProcessingTime: number[] = [];

interface ErrorMessage {
  nativeEvent: {
    error?: string;
  };
}
interface ReasonMessage {
  nativeEvent: {
    reason?: string;
  };
}
interface LogMessage {
  nativeEvent: {
    log: string;
  };
}

interface Props {
  cameraRef: React.RefObject<Camera>;
  confidenceThreshold: number;
  filterByTaxonId: string | null;
  negativeFilter: boolean;
  onTaxaDetected: ( result: InatVision.Result ) => void;
  onCameraError: ( error: ErrorMessage ) => void;
  onDeviceNotSupported: ( error: ReasonMessage ) => void;
  onClassifierError: ( error: ErrorMessage ) => void;
  onCaptureError: ( error: ReasonMessage ) => void;
  onLog: ( event: LogMessage ) => void;
  isActive: boolean;
}

const FrameProcessorCamera = ( props: Props ) => {
  const {
    cameraRef,
    confidenceThreshold,
    filterByTaxonId,
    negativeFilter,
    onTaxaDetected,
    onCameraError,
    onDeviceNotSupported,
    onClassifierError,
    onCaptureError,
    onLog,
    isActive
  } = props;

  const navigation = useNavigation( );
  const isFocused = useIsFocused( );
  const isForeground = useIsForeground( );

  const granted = useLocationPermission( );
  const coords = useTruncatedUserCoords( granted );

  const [cameraPermissionStatus, setCameraPermissionStatus] = useState( "not-determined" );
  const requestCameraPermission = useCallback( async () => {
    // Checking camera permission status, if granted set it and return
    const status = Camera.getCameraPermissionStatus();
    if ( status === "granted" ) {
      setCameraPermissionStatus( status );
      return;
    }
    console.log( "Requesting camera permission..." );
    const permission = await Camera.requestCameraPermission();
    console.log( `Camera permission status: ${permission}` );

    if ( permission === "denied" ) {
      // If the user has not granted permission we have to show an error message
      // This string is returned from the legacy camera when the user has not granted the needed permissions
      // and expected by HOC to be received and reacted to
      const returnError: { nativeEvent: { error?: string } } = {
        nativeEvent: {
          error:
            "Camera Input Failed: This app is not authorized to use Back Camera."
        }
      };
      onCameraError( returnError );
    }
    setCameraPermissionStatus( permission );
  }, [onCameraError] );

  useEffect( () => {
    if ( cameraPermissionStatus === "not-determined" ) {
      requestCameraPermission();
    }
  }, [cameraPermissionStatus, requestCameraPermission] );

  // Currently, we are asking for camera permission on focus of the screen, that results in one render
  // of the camera before permission is granted. This is to keep track and to throw error after the first error only.
  const [permissionCount, setPermissionCount] = useState( 0 );
  const backDevice = useCameraDevice( "back", {
    physicalDevices: [
      "ultra-wide-angle-camera",
      "wide-angle-camera",
      "telephoto-camera"
    ]
  } );
  const frontDevice = useCameraDevice( "front" );
  let device = backDevice;
  // If there is no back camera, use the front camera
  if ( !device ) {
    device = frontDevice;
  }
  // Select the camera format based on the screen aspect ratio on ai camera as it is full-screen
  const screen = Dimensions.get( "screen" );
  const videoAspectRatio = screen.height / screen.width;
  const photoAspectRatio = screen.height / screen.width;
  // Select a format that provides the highest resolution primarily for videos, then photos
  const iosFormat = useCameraFormat( device, [
    { videoAspectRatio },
    { photoAspectRatio },
    { photoResolution: "max" },
    { videoResolution: "max" }
  ] );
  if ( Platform.OS === "android" ) {
    console.log( "Android is not using a specific camera format because we never got around to" );
  }
  const format = Platform.OS === "ios" ? iosFormat : undefined;

  // Set the exposure to the middle of the min and max exposure
  const exposure = ( device.maxExposure + device.minExposure ) / 2;

  useEffect( () => {
    const unsubscribeFocus = navigation.addListener( "focus", () => {
      InatVision.resetStoredResults();
    } );

    return unsubscribeFocus;
  }, [navigation] );

  useEffect( () => {
    const unsubscribeBlur = navigation.addListener( "blur", () => {
      InatVision.resetStoredResults();
    } );

    return unsubscribeBlur;
  }, [navigation] );

  useEffect( () => {
    if ( Platform.OS === "android" ) {
      InatVision.addLogListener( ( event: { log: string } ) => {
        const returnEvent = {
          nativeEvent: event
        };
        onLog( returnEvent );
      } );
    }

    return () => {
      InatVision.removeLogListener();
    };
  }, [onLog] );

  const {
    animatedStyle,
    tapToFocus
  } = useFocusTap( props.cameraRef, device.supportsFocus );

  const [lastTimestamp, setLastTimestamp] = useState( undefined );
  const fps = 1;
  const handleResult = Worklets.createRunOnJS( ( result: InatVision.Result, timeTaken: number ) => {
    setLastTimestamp( result.timestamp );
    console.log( "result.timeElapsed", result.timeElapsed );
    framesProcessingTime.push( timeTaken );
    if ( framesProcessingTime.length >= 10 ) {
      const avgTime = framesProcessingTime.reduce( ( a, b ) => a + b, 0 ) / 10;
      framesProcessingTime = [];
      onLog( {
        nativeEvent: {
          log: `Average frame processing time over 10 frames: ${avgTime}ms`
        }
      } );
    }
    onTaxaDetected( result );
  } );

  const handleError = Worklets.createRunOnJS( ( error: ErrorMessage ) => {
    onClassifierError( error );
  } );

  const patchedRunAsync = usePatchedRunAsync();
  const hasUserLocation = coords?.latitude != null && coords?.longitude != null;
  // The vision-plugin has a function to look up the location of the user in a h3 gridded world
  // unfortunately, I was not able to run this new function in the worklets directly,
  // so we need to do this here before calling the useFrameProcessor hook.
  // For predictions from file this function runs in the vision-plugin code directly.
  const geoModelCellLocation = hasUserLocation
    ? InatVision.getCellLocation( coords )
    : null;
  const frameProcessor = useFrameProcessor(
    ( frame ) => {
      "worklet";

      // Reminder: this is a worklet, running on a C++ thread. Make sure to check the
      // react-native-worklets-core documentation for what is supported in those worklets.
      // If there is no lastTimestamp, i.e. the first time this runs do not compare
      const timestamp = Date.now();
      if ( lastTimestamp ) {
        const timeSinceLastFrame = timestamp - lastTimestamp;
        if ( timeSinceLastFrame < 1000 / fps ) {
          return;
        }
      }
      patchedRunAsync( frame, () => {
        "worklet";
        try {
          const timeBefore = Date.now();
          const result = InatVision.inatVision( frame, {
            version: "2.13",
            modelPath: dirModel,
            taxonomyPath: dirTaxonomy,
            confidenceThreshold,
            filterByTaxonId,
            negativeFilter,
            useGeomodel: hasUserLocation,
            geomodelPath: dirGeomodel,
            location: {
              latitude: geoModelCellLocation?.latitude,
              longitude: geoModelCellLocation?.longitude,
              elevation: geoModelCellLocation?.elevation
            }
          } );
          const timeAfter = Date.now();
          const timeTaken = timeAfter - timeBefore;
          handleResult( result, timeTaken );
        } catch ( classifierError ) {
          // Currently the native side throws RuntimeException but that doesn't seem to arrive here over he bridge
          console.log( `Error: ${classifierError.message}` );
          const returnError = {
            nativeEvent: { error: classifierError.message }
          };
          handleError( returnError );
        }
      } );
      // ref={camera} was only used for takePictureAsync()
      // Johannes: I did a read though of the native code that is triggered when using ref.current.takePictureAsync()
      // and to me it seems everything should be handled by vision-camera itself. However, there is also some Exif and device orientation stuff going on.
      // related code that would need to be tested if it all is saved as expected.
    },
    [
      patchedRunAsync,
      confidenceThreshold,
      filterByTaxonId,
      negativeFilter,
      lastTimestamp,
      fps,
      hasUserLocation,
      geoModelCellLocation
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

      // If it is a "device/" error, return the error code
      if ( error.code.includes( "device/" ) ) {
        const returnReason: { nativeEvent: { reason?: string } } = {
          nativeEvent: { reason: error.code }
        };
        onDeviceNotSupported( returnReason );
        return;
      }

      if ( error.code.includes( "capture/" ) ) {
        const returnReason: { nativeEvent: { reason?: string } } = {
          nativeEvent: { reason: error.code }
        };
        onCaptureError( returnReason );
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
        // and expected by HOC to be received and reacted to
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

  const active = isActive && isFocused && isForeground;
  return (
    device && cameraPermissionStatus === "granted" && (
      <>
        <GestureDetector gesture={Gesture.Simultaneous( tapToFocus )}>
          <Camera
            ref={cameraRef}
            style={styles.camera}
            device={device}
            format={format}
            exposure={exposure}
            isActive={active}
            photo={true}
            enableZoomGesture
            zoom={device.neutralZoom}
            frameProcessor={frameProcessor}
            pixelFormat="yuv"
            onError={onError}
            outputOrientation="device"
            photoQualityBalance="speed"
          />
        </GestureDetector>
        <FocusSquare
          animatedStyle={animatedStyle}
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
