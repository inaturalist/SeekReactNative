// @flow

import type { Node } from "react";
import React, { useEffect } from "react";
import { Animated, StyleSheet } from "react-native";

type Props = {
  tappedCoordinates: Object,
  singleTapToFocusAnimation: any,
};

const HALF_SIZE_FOCUS_BOX = 40;

const FocusSquare = ( {
  tappedCoordinates,
  singleTapToFocusAnimation
}: Props ): Node => {
  useEffect( () => {
    if ( tappedCoordinates ) {
      Animated.timing( singleTapToFocusAnimation, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true
      } ).start();
    }
  }, [singleTapToFocusAnimation, tappedCoordinates] );

  if ( !tappedCoordinates ) {
    return null;
  }

  return (
    // $FlowIgnore
    <Animated.View
      style={[
        styles.focusSquare,
        {
          left: tappedCoordinates.x - HALF_SIZE_FOCUS_BOX,
          top: tappedCoordinates.y - HALF_SIZE_FOCUS_BOX,
          opacity: singleTapToFocusAnimation
        }
      ]}
    />
  );
};

// Create styles
const styles = StyleSheet.create( {
  focusSquare: {
    position: "absolute",
    width: HALF_SIZE_FOCUS_BOX * 2,
    height: HALF_SIZE_FOCUS_BOX * 2,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white"
  }
} );

export default FocusSquare;
