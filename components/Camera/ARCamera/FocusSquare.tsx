import { isEmpty } from "lodash";
import React from "react";
import { Animated, StyleSheet } from "react-native";

interface Props {
  animatedStyle: Object
}

const FocusSquare = ( { animatedStyle }: Props ) => {
  if ( isEmpty( animatedStyle ) ) { return null; }
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
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "white",
  },
} );

export default FocusSquare;
