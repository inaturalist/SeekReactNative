import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import type { CameraDevice, CameraPhotoOutput, CameraRef } from "react-native-vision-camera";
import { scheduleOnRN } from "react-native-worklets";

import { LogLevels, logToApi } from "../../../utility/apiCalls";
import {
  useIsForeground,
  useTruncatedUserCoords,
} from "../../../utility/customHooks";
import { dirGeomodel, dirModel, dirTaxonomy } from "../../../utility/dirStorage";
import FocusSquare from "./FocusSquare";
import {
  Camera,
  useAsyncRunner,
  useFrameOutput,
} from "./helpers/visionCameraWrapper";
import InatVision from "./helpers/visionPluginWrapper";
import useFocusTap from "./hooks/useFocusTap";

export interface ErrorMessage {
  nativeEvent: {
    error?: string;
  };
}
export interface ReasonMessage {
  nativeEvent: {
    reason?: string;
  };
}
export interface LogMessage {
  nativeEvent: {
    log: string;
  };
}

interface Props {
  device: CameraDevice;
  confidenceThreshold: number;
  filterByTaxonId: string | null;
  negativeFilter: boolean;
  onTaxaDetected: ( result: InatVision.Result ) => void;
  onCameraError: ( error: ErrorMessage ) => void;
  onClassifierError: ( error: ErrorMessage ) => void;
  onLog: ( event: LogMessage ) => void;
  isActive: boolean;
  useLocation: boolean;
  hasPermission: boolean;
  photoOutput: CameraPhotoOutput;
}

const FrameProcessorCamera = ( props: Props ) => {
  const {
    device,
    confidenceThreshold,
    filterByTaxonId,
    negativeFilter,
    onTaxaDetected,
    onCameraError,
    onClassifierError,
    onLog,
    isActive,
    useLocation,
    hasPermission,
    photoOutput,
  } = props;

  const navigation = useNavigation( );
  const isFocused = useIsFocused( );
  const isForeground = useIsForeground( );

  const coords = useTruncatedUserCoords( hasPermission );
  
  const cameraRef = useRef<CameraRef>( null );
  const framesProcessingTime = useRef<number[]>( [] );

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
          nativeEvent: event,
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
    tapToFocus,
    tappedCoordinates,
  } = useFocusTap( cameraRef );

  const [lastTimestamp, setLastTimestamp] = useState<number | undefined>( undefined );
  const fps = 1;
  const handleResult = ( result: InatVision.Result, timeTaken: number ) => {
    setLastTimestamp( result.timestamp );
    console.log( "result.timeElapsed", result.timeElapsed );
    framesProcessingTime.current.push( timeTaken );
    if ( framesProcessingTime.current.length >= 10 ) {
      const avgTime = framesProcessingTime.current.reduce( ( a, b ) => a + b, 0 ) / 10;
      framesProcessingTime.current = [];
      onLog( {
        nativeEvent: {
          log: `Average frame processing time over 10 frames: ${avgTime}ms`,
        },
      } );
    }
    onTaxaDetected( result );
  };

  const hasUserLocation = coords?.latitude != null && coords?.longitude != null;
  const useGeomodel = useLocation && hasUserLocation;
  // The vision-plugin has a function to look up the location of the user in a h3 gridded world
  // unfortunately, I was not able to run this new function in the worklets directly,
  // so we need to do this here before calling the useFrameProcessor hook.
  // For predictions from file this function runs in the vision-plugin code directly.
  const geoModelCellLocation = hasUserLocation
    ? InatVision.getCellLocation( coords )
    : null;
  const cellLat = geoModelCellLocation?.latitude;
  const cellLng = geoModelCellLocation?.longitude;
  const cellElev = geoModelCellLocation?.elevation;
  const hasCellLocation =
    typeof cellLat === "number" &&
    typeof cellLng === "number" &&
    typeof cellElev === "number";

  const asyncRunner = useAsyncRunner( );
  const frameOutput = useFrameOutput( {
    allowDeferredStart: true,
    enablePhysicalBufferRotation: true,
    pixelFormat: "yuv",
    onFrame( frame ) {
      "worklet";
      const wasHandled = asyncRunner.runAsync( () => {
        "worklet";
        try {
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
          const timeBefore = new Date().getTime();

          const options = {
            version: "2.13",
            modelPath: dirModel,
            taxonomyPath: dirTaxonomy,
            confidenceThreshold,
            filterByTaxonId,
            negativeFilter,
            useGeomodel,
            geomodelPath: dirGeomodel,
          };

          if ( useGeomodel && hasCellLocation ) {
            options.location = {
              latitude: cellLat,
              longitude: cellLng,
              elevation: cellElev,
            };
          }

          const result = InatVision.inatVision( frame, options );
          const timeAfter = Date.now();
          const timeTaken = timeAfter - timeBefore;
          scheduleOnRN( handleResult, result, timeTaken );
        } catch ( classifierError ) {
          // Currently the native side throws RuntimeException but that doesn't seem to arrive here over he bridge
          console.log( `Error: ${classifierError.message}` );
          const returnError = {
            nativeEvent: { error: classifierError.message },
          };
          scheduleOnRN( onClassifierError, returnError );
        } finally {
          frame.dispose();
        }
      } );

      if ( !wasHandled ) {
        // `asyncRunner` is busy - drop this Frame!
        frame.dispose();
      }
    },
  } );

  const onError = useCallback(
    ( error: Error ) => {
      console.log( "error", error );
      logToApi( {
        level: LogLevels.ERROR,
        context: "FrameProcessorCamera.tsx",
        message: error.message,
        errorType: error.constructor?.name,
        backtrace: error.stack,
      } );
      const returnString = error.message;
      const returnError: { nativeEvent: { error?: string } } = {
        nativeEvent: { error: returnString },
      };
      onCameraError( returnError );
    },
    [ onCameraError ]
  );

  const active = isActive && isFocused && isForeground;
  return (
    <>
      <GestureDetector gesture={Gesture.Simultaneous( tapToFocus )}>
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={active}
          outputs={[photoOutput, frameOutput]}
          constraints={[
            { resolutionBias: photoOutput },
          ]}
          enableNativeZoomGesture={true}
          onError={onError}
          orientationSource="device"
        />
      </GestureDetector>
      <FocusSquare
        animatedStyle={animatedStyle}
        tappedCoordinates={tappedCoordinates}
      />
    </>
  );
};

export default FrameProcessorCamera;
