import React from "react";
import { StyleSheet } from "react-native";
import type { AnimatedStyle } from "react-native-reanimated";
import Animated from "react-native-reanimated";

import { HALF_SIZE_FOCUS_BOX  } from "./hooks/useFocusTap";
import type { Coordinates } from "./hooks/useFocusTap";

interface Props {
  animatedStyle: AnimatedStyle;
  tappedCoordinates: Coordinates | null;
}

const FocusSquare = ( { animatedStyle, tappedCoordinates }: Props ) => {
  if ( !tappedCoordinates ) { return null; }
  return (
    <Animated.View
      style={[
        styles.focusSquare,
        animatedStyle,
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
    borderColor: "white",
  },
} );

export default FocusSquare;
