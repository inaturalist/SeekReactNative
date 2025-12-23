import { StyleSheet } from "react-native";
import { center } from "../global";

const viewStyles = StyleSheet.create( {
  center,
  circleStyle: {
    height: 59,
    width: 59,
  },
  largeCircleStyle: {
    height: 113,
    width: 113,
  },
} );

const textStyles = StyleSheet.create( {
  circleText: {
    fontSize: 19,
  },
  largeCircleText: {
    fontSize: 29,
  },
} );

export {
  textStyles,
  viewStyles,
};
