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
  },
  landscapeHeader: {
    borderRadius: 20,
    backgroundColor: colors.seekForestGreen,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  landscapeHeaderSpecies: {
    backgroundColor: colors.seekGreen
  },
  landscapeDots: {
    backgroundColor: colors.white,
    borderRadius: 10 / 2,
    height: 10,
    marginHorizontal: 16,
    width: 10
  },
  landscapeDotsGray: {
    backgroundColor: colors.darkGray,
    borderRadius: 6 / 2,
    height: 6,
    marginBottom: 3,
    marginHorizontal: 16,
    marginTop: 3,
    width: 6
  }
} );
