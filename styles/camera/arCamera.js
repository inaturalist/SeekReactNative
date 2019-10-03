import {
  StyleSheet,
  Dimensions,
  Platform,
  PixelRatio
} from "react-native";
import { colors, fonts, touchable } from "../global";

const { width, height } = Dimensions.get( "window" );
const fontScale = PixelRatio.getFontScale();

export default StyleSheet.create( {
  backButton: {
    left: 23,
    position: "absolute",
    top: height > 670 ? 49 : 18
  },
  camera: {
    height,
    width: Platform.OS === "android" ? width + 100 : width, // this should account for offcenter photos on android
    zIndex: -2
  },
  container: {
    alignItems: "center",
    backgroundColor: colors.black,
    flex: 1
  },
  dotRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center"
  },
  dots: {
    marginHorizontal: width / 32
  },
  errorText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    marginHorizontal: 41,
    position: "absolute",
    textAlign: "center",
    top: "50%"
  },
  greenButton: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.seekGreen,
    borderRadius: 6,
    height: 26,
    justifyContent: "center",
    width: 101
  },
  greenButtonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16,
    letterSpacing: 0.94,
    paddingTop: Platform.OS === "ios" ? 6 : null
  },
  header: {
    position: "absolute",
    top: height > 670 ? 80 : 40
  },
  help: {
    bottom: 35,
    position: "absolute",
    right: 64,
    zIndex: 1
  },
  loading: {
    position: "absolute",
    top: height / 2 - 50
  },
  predictions: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 20,
    margin: 23,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3
  },
  safeView: {
    backgroundColor: colors.black,
    flex: 0
  },
  scanText: {
    bottom: 95,
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 14 : 16,
    lineHeight: 21,
    margin: 20,
    maxWidth: 293,
    position: "absolute",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3
  },
  shutter: {
    bottom: 18,
    position: "absolute",
    zIndex: 1
  },
  touchable
} );
