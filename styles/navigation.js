import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  dimensions
} from "./global";

const { width, height } = dimensions;

const requiresSafeArea = () => Platform.OS === "ios" && height > 570;

export default StyleSheet.create( {
  cameraTab: {
    backgroundColor: colors.black,
    paddingHorizontal: width / 10
  },
  cameraTabLabel: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 14,
    letterSpacing: 0.88,
    marginBottom: requiresSafeArea() ? 25 : 0
  },
  indicator: {
    backgroundColor: colors.seekGreen,
    borderRadius: 40,
    height: 2,
    left: width / 10,
    marginBottom: requiresSafeArea() ? 25 : 0,
    width: width / 2.5
  }
} );
