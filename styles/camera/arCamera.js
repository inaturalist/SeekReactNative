import { StyleSheet, Dimensions, Platform } from "react-native";
import { colors, fonts } from "../global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.black
  },
  camera: {
    width,
    height,
    zIndex: -2
  },

  greenButton: {
    backgroundColor: colors.seekGreen,
    borderRadius: 6,
    height: 26,
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "ios" ? 6 : null,
    alignItems: "center",
    justifyContent: "center"
  },
  greenButtonText: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: colors.white,
    letterSpacing: 0.94
  },
  predictions: {
    textAlign: "center",
    margin: 23,
    fontSize: 20,
    fontFamily: fonts.semibold,
    color: colors.white
  },
  header: {
    position: "absolute",
    top: 40
  },
  dotRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    alignItems: "center"
  },
  whiteDot: {
    marginHorizontal: 18,
    backgroundColor: colors.white,
    borderRadius: 4 / 2,
    width: 4,
    height: 4
  },
  greenDot: {
    marginHorizontal: 18,
    backgroundColor: colors.seekGreen,
    borderWidth: 1,
    borderRadius: 10 / 2,
    borderColor: colors.white,
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
  scanText: {
    position: "absolute",
    bottom: 95,
    fontSize: 16,
    textAlign: "center",
    color: colors.white,
    margin: 20,
    lineHeight: 21,
    fontFamily: fonts.semibold,
    maxWidth: 293
  },
  footer: {
    backgroundColor: colors.black,
    position: "absolute",
    bottom: 10,
    height: 105,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  help: {
    position: "absolute",
    left: 70,
    bottom: 35
  },
  shutter: {
    position: "absolute",
    bottom: 18
  },
  capture: {
    position: "absolute",
    bottom: 18
  }
} );
