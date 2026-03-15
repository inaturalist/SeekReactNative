import {
  useCallback, useMemo, useState,
} from "react";
import {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import type {
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import {
  Gesture,
} from "react-native-gesture-handler";
import type { Camera } from "../helpers/visionCameraWrapper";
const HALF_SIZE_FOCUS_BOX = 40;

export interface Coordinates {
  x: number;
  y: number;
}

const useFocusTap = ( cameraRef: React.RefObject<Camera | null>, supportsFocus: boolean ) => {
  const [tappedCoordinates, setTappedCoordinates] = useState<Coordinates | null>( null );
  const focusOpacity = useSharedValue( 0 );
  const focusLeft = useSharedValue( 0 );
  const focusTop = useSharedValue( 0 );

  const animatedStyle = useAnimatedStyle( ( ) => ( {
    left: focusLeft.value,
    top: focusTop.value,
    width: HALF_SIZE_FOCUS_BOX * 2,
    height: HALF_SIZE_FOCUS_BOX * 2,
    opacity: focusOpacity.value,
  } ) );

  const onFocus = useCallback( async ( { x, y }: GestureStateChangeEvent<TapGestureHandlerEventPayload> ) => {
    // If the device doesn't support focus, we don't want the camera to focus
    if ( !supportsFocus ) {
      return;
    }
    cameraRef?.current?.focus( { x, y } );
    focusLeft.set( x - HALF_SIZE_FOCUS_BOX );
    focusTop.set( y - HALF_SIZE_FOCUS_BOX );
    focusOpacity.set( 1 );
    setTappedCoordinates( { x, y } );
    focusOpacity.set( withTiming( 0, { duration: 2000 } ) );
  }, [cameraRef, focusLeft, focusTop, focusOpacity, supportsFocus] );

  const tapToFocus = useMemo( ( ) => Gesture.Tap( )
    .runOnJS( true )
    .onStart( onFocus ), [onFocus] );

  return {
    animatedStyle,
    tapToFocus,
    tappedCoordinates,
  };
};

export default useFocusTap;
