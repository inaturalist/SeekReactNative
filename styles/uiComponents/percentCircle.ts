// @flow

import { StyleSheet } from "react-native";
import { padding, center } from "../global";

const viewStyles = StyleSheet.create( {
  center,
  circleStyle: {
    height: 59,
    width: 59
  },
  largeCircleStyle: {
    height: 113,
    width: 113
  }
} );

const textStyles = StyleSheet.create( {
  circleText: {
    fontSize: 19,
    paddingTop: padding.iOSButtonPadding
  },
  largeCircleText: {
    fontSize: 29,
    paddingTop: padding.iOSPadding
  }
} );

export {
  textStyles,
  viewStyles
};
