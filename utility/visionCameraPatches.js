/*
    This file contains various patches for handling the react-native-vision-camera library.
*/
import {
  useSharedValue as useWorkletSharedValue,
  Worklets
} from "react-native-worklets-core";

// This patch is currently required because we are using react-native-vision-camera v4.0.3
// together wit react-native-reanimated. The problem is that the runAsync function
// from react-native-vision-camera does not work in release mode with this reanimated.
// Uses this workaround: https://gist.github.com/nonam4/7a6409cd1273e8ed7466ba3a48dd1ecc but adapted it to
// version 4 of vision-camera.
// Originally, posted on this currently open issue: https://github.com/mrousavy/react-native-vision-camera/issues/2589
export const usePatchedRunAsync = ( ) => {
  /**
   * Print worklets logs/errors on js thread
   */
  const logOnJs = Worklets.createRunOnJS( ( log, error ) => {
    console.log( "logOnJs - ", log, " - error?:", error?.message ?? "no error" );
  } );
  const isAsyncContextBusy = useWorkletSharedValue( false );
  const customRunOnAsyncContext = Worklets.defaultContext.createRunAsync(
    ( frame, func ) => {
      "worklet";

      try {
        func( frame );
      } catch ( e ) {
        logOnJs( "customRunOnAsyncContext error", e );
      } finally {
        frame.decrementRefCount();
        isAsyncContextBusy.value = false;
      }
    }
  );

  function customRunAsync( frame, func ) {
    "worklet";

    if ( isAsyncContextBusy.value ) {
      return;
    }
    isAsyncContextBusy.value = true;
    const internal = frame;
    internal.incrementRefCount();
    customRunOnAsyncContext( internal, func );
  }

  return customRunAsync;
};
