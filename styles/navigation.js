// @flow

import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  dimensions
} from "./global";

const { width, height } = dimensions;

const requiresSafeArea = ( ) => Platform.OS === "ios" && height > 570;



const viewStyles = StyleSheet.create( {
  cameraTab: {
    backgroundColor: colors.black
  },
  indicator: {
    backgroundColor: colors.seekGreen,
    borderRadius: 40,
    height: 2,
    position: "absolute",
    top: 37,
    left: width / 19,
    width: width / 2.5
  }
} );

const textStyles = StyleSheet.create( {
  cameraTabLabel: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 0.88,
    marginBottom: requiresSafeArea( ) ? 25 : 0
  }
} );

export {
  textStyles,
  viewStyles
};
