import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors, fonts } from "../global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  camera: {
    width,
    height,
    zIndex: -2
  },
  scanText: {
    fontSize: 16,
    textAlign: "center",
    margin: 20,
    lineHeight: 21,
    fontFamily: fonts.semibold,
    maxWidth: 293
  },
  greenButton: {
    backgroundColor: colors.seekGreen,
    borderRadius: 6,
    height: 26,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "ios" ? 6 : 3
  },
  greenButtonText: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: colors.white,
    letterSpacing: 0.94
  },
  predictions: {
    textAlign: "center",
    margin: 10,
    fontSize: 20,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen
  },
  dotRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center"
  },
  whiteDot: {
    margin: 18,
    backgroundColor: colors.seekGreen,
    borderRadius: 4 / 2,
    width: 4,
    height: 4
  },
  greenDot: {
    margin: 18,
    backgroundColor: colors.seekGreen,
    borderWidth: 1,
    borderRadius: 10 / 2,
    borderColor: colors.black,
    width: 10,
    height: 10
  },
  safeView: {
    flex: 1,
    backgroundColor: colors.black
  },
  main: {
    flexGrow: 1
  },
  footer: {
    zIndex: 1,
    height: 105,
    backgroundColor: colors.black,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  placeholder: {
    width: 49
  },
  capture: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 49 / 2,
    borderColor: colors.seekiNatGreen,
    width: 49,
    height: 49
  }
} );
