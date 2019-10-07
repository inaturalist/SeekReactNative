import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  touchable
} from "./global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  backButton: {
    left: 23,
    top: 18
  },
  caption: {
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    width: 245
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  explainImage: {
    marginBottom: 33,
    resizeMode: "contain",
    width: width - 56
  },
  forestGreenText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginBottom: 7
  },
  headerMargin: {
    marginBottom: 30
  },
  heatMap: {
    height: 227,
    overflow: "hidden",
    resizeMode: "cover",
    width
  },
  iNatLogo: {
    height: height > 570 ? 65 : 45,
    position: "absolute",
    resizeMode: "contain",
    right: -5,
    top: 5,
    width: height > 570 ? 81 : 61
  },
  image: {
    height: 286,
    resizeMode: "cover",
    width
  },
  leftArrow: {
    left: 5,
    position: "absolute",
    top: 137,
    zIndex: 1
  },
  logo: {
    alignSelf: "center",
    height: 34,
    resizeMode: "contain",
    width: 175
  },
  missionContainer: {
    alignItems: "flex-start",
    backgroundColor: colors.white,
    marginBottom: 46,
    marginHorizontal: 27,
    marginTop: 21
  },
  missionHeaderText: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: 19,
    lineHeight: 24,
    marginBottom: 10
  },
  missionText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  numberText: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 30,
    marginBottom: 23
  },
  photoContainer: {
    height: 375
  },
  rightArrow: {
    position: "absolute",
    right: 5,
    top: 137,
    zIndex: 1
  },
  safeView: {
    backgroundColor: colors.transparent,
    flex: 1
  },
  touchable
} );
