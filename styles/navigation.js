import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  dimensions
} from "./global";

const { width, height } = dimensions;

const requiresSafeArea = ( ) => Platform.OS === "ios" && height > 570;

export default StyleSheet.create( {
  cameraTab: {
    backgroundColor: colors.black
  },
  cameraTabLabel: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 0.88,
    marginBottom: requiresSafeArea( ) ? 25 : 0
  },
  indicator: {
    backgroundColor: colors.seekGreen,
    borderRadius: 40,
    height: 2,
    position: "absolute",
    top: 37,
    left: width / 19,
    width: width / 2.5
  },
  galleryIndicator: {
    backgroundColor: colors.seekGreen,
    borderRadius: 40,
    height: 2,
    position: "absolute",
    top: 37,
    right: width / 19,
    width: width / 2.5
  }
} );
