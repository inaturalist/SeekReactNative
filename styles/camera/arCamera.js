// @flow

import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors, fonts, row } from "../global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  backButton: {
    left: 0,
    paddingHorizontal: 23,
    paddingVertical: 19,
    position: "absolute",
    top: height > 700 ? 31 : 0
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  settingsButton: {
    right: 0,
    paddingHorizontal: 23,
    paddingVertical: 19,
    position: "absolute",
    top: height > 700 ? 31 : 0
  },
  settingsIcon: {
    tintColor: colors.white,
    height: 20,
    width: 20
  },
  camera: {
    height,
    width: Platform.OS === "android" ? width + 100 : width, // this should account for offcenter photos on android
    zIndex: -1
  },
  cameraType: {
    right: 0,
    paddingHorizontal: 23,
    paddingVertical: 19,
    position: "absolute",
    top: height > 700 ? 31 : 0
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.black,
    flex: 1
  },
  row,
  loading: {
    position: "absolute",
    top: height / 2 - 50
  }
} );
