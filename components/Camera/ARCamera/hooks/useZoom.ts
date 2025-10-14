import _ from "lodash";
import {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  Gesture
} from "react-native-gesture-handler";
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import type { CameraDevice, CameraProps } from "react-native-vision-camera";

// This is taken from react-native-vision library itself: https://github.com/mrousavy/react-native-vision-camera/blob/9eed89aac6155eba155595f3e006707152550d0d/package/example/src/Constants.ts#L19 https://github.com/mrousavy/react-native-vision-camera/blob/9eed89aac6155eba155595f3e006707152550d0d/package/example/src/CameraPage.tsx#L34

// The maximum zoom factor you should be able to zoom in
const MAX_ZOOM_FACTOR = 20;

// Used for calculating the final zoom by pinch gesture
const SCALE_FULL_ZOOM = 3;
const PAN_ZOOM_MIN_DISTANCE = -100;
const PAN_ZOOM_MAX_DISTANCE = 100;

const useZoom = ( device: CameraDevice ) => {
  const initialZoomTextValue = "1";
  const zoomButtonOptions = useMemo( () => {
    const options = [initialZoomTextValue];
    if ( device?.physicalDevices?.includes( "ultra-wide-angle-camera" ) ) {
      // Add a 0.5x zoom option for ultra-wide-angle cameras to front of array
      options.unshift( ".5" );
    }
    if ( device?.physicalDevices?.includes( "telephoto-camera" ) ) {
      // Add a 3x zoom option for telephoto cameras to end of array
      options.push( "3" );
    }
    return options;
  }, [device?.physicalDevices] );
  const minZoom = device?.minZoom ?? 1;
  const neutralZoom = device?.neutralZoom ?? 2;
  // this maxZoom zooms to 3x magnification on an iPhone 15 Pro
  // currently the camera viewport is different than the photo taken
  // so the photo taken with this zoom looks accurate compared with the native camera
  // photo taken, but the camera preview looks a little too small
  const maxZoomWithButton = neutralZoom ** 2.5;
  const maxZoomWithPinch = Math.min( device.maxZoom ?? 1, MAX_ZOOM_FACTOR );
  const initialZoom = !device?.isMultiCam
    ? minZoom
    : neutralZoom;
  const zoom = useSharedValue( initialZoom );
  const startZoom = useSharedValue( initialZoom );
  const [zoomTextValue, setZoomTextValue] = useState( initialZoomTextValue );

  const zoomButtonValues = [minZoom, neutralZoom, maxZoomWithButton];

  useEffect( ( ) => {
    const newInitialZoom = !device?.isMultiCam
      ? minZoom
      : neutralZoom;
    zoom.set( newInitialZoom );
    startZoom.set( newInitialZoom );
  }, [device?.isMultiCam, minZoom, neutralZoom, zoom, startZoom] );

  const handleZoomButtonPress = ( ) => {
    if ( zoomTextValue === _.last( zoomButtonOptions ) ) {
      zoom.set( withSpring( zoomButtonValues[0] ) );
      setZoomTextValue( zoomButtonOptions[0] );
    } else {
      const zoomIndex = _.indexOf( zoomButtonOptions, zoomTextValue );
      zoom.set( withSpring( zoomButtonValues[zoomIndex + 1] ) );
      setZoomTextValue( zoomButtonOptions[zoomIndex + 1] );
    }
  };

  const onZoomStart = useCallback( ( ) => {
    // start pinch-to-zoom
    startZoom.set( zoom.get() );
  }, [startZoom, zoom] );

  const resetZoom = ( ) => {
    zoom.set( initialZoom );
    setZoomTextValue( initialZoomTextValue );
  };

  const updateZoomTextValue = useCallback( ( newZoom: number ) => {
    const closestZoomTextValue = zoomButtonOptions.reduce(
      ( prev, curr ) => {
        if ( newZoom === minZoom ) {
          return zoomButtonOptions[0];
        }
        return (
          Math.abs( curr - newZoom ) < Math.abs( prev - newZoom )
            ? curr
            : prev );
      }
    );
    setZoomTextValue( closestZoomTextValue );
  }, [zoomButtonOptions, minZoom] );

  const onZoomChange = useCallback( ( newValue: number ) => {
    "worklet";

    const newZoom = interpolate(
      newValue,
      [-1, 0, 1],
      [minZoom, startZoom.get( ), maxZoomWithPinch],
      Extrapolation.CLAMP
    );
    zoom.set( newZoom );

    runOnJS( updateZoomTextValue )( newZoom );
  }, [maxZoomWithPinch, minZoom, updateZoomTextValue, startZoom, zoom] );

  const animatedProps = useAnimatedProps < CameraProps >(
    () => ( { zoom: zoom.get( ) } )
  );

  const pinchToZoom = useMemo( ( ) => Gesture.Pinch( )
    .runOnJS( true )
    .onStart( ( ) => {
      onZoomStart( );
    } )
    .onChange( e => {
      // Calculate new zoom value from pinch to zoom
      // (since scale factor is relative to initial pinch)
      const newValue = interpolate(
        e.scale,
        [1 - 1 / SCALE_FULL_ZOOM, 1, SCALE_FULL_ZOOM],
        [-1, 0, 1],
        Extrapolation.CLAMP
      );
      onZoomChange( newValue );
    } ), [
    onZoomChange,
    onZoomStart
  ] );

  const yDiff = useSharedValue( 0 );
  const isPanActive = useSharedValue( false );
  const panToZoom = Gesture.Pan()
    .runOnJS( true )
    .averageTouches( true )
    .activateAfterLongPress( 1 )
    .onBegin( () => {
      yDiff.set( 0 );
      isPanActive.set( true );
      onZoomStart( );
    } )
    .onChange( ev => {
      yDiff.set( value => value + ev.changeY );
      // Calculate new zoom value from pan (invert because minus pan is up)
      const newValue = interpolate(
        yDiff.get( ),
        [PAN_ZOOM_MIN_DISTANCE, 0, PAN_ZOOM_MAX_DISTANCE],
        [-1, 0, 1],
        Extrapolation.CLAMP
      ) * -1;
      onZoomChange( newValue );
    } )
    .onEnd( () => {
      isPanActive.set( false );
    } );

  return {
    animatedProps,
    handleZoomButtonPress,
    panToZoom,
    pinchToZoom,
    resetZoom,
    showZoomButton: device?.isMultiCam,
    zoomTextValue
  };
};

export default useZoom;
