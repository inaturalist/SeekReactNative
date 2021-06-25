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
  dots: {
    marginHorizontal: width / 32
  },
  greenButton: {
    alignItems: "center"
  },
  header: {
    position: "absolute",
    top: height > 700 ? 89 : 58
  },
  loading: {
    position: "absolute",
    top: height / 2 - 50
  },
  predictions: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 20,
    margin: 22,
    textAlign: "center",
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3
  },
  scientificName: {
    fontFamily: fonts.semiboldItalic
  }
} );
