import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  padding,
  touchable
} from "./global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: colors.transparent
  },
  header: {
    height: 55,
    marginBottom: 30,
    backgroundColor: colors.white
  },
  logo: {
    alignSelf: "center",
    width: 175,
    height: 34,
    resizeMode: "contain"
  },
  backButton: {
    top: 18,
    left: 23
  },
  iNatLogo: {
    position: "absolute",
    top: 5,
    right: -5,
    height: height > 570 ? 65 : 45,
    width: height > 570 ? 81 : 61,
    resizeMode: "contain"
  },
  numberText: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 30,
    marginBottom: 23
  },
  explainImage: {
    marginBottom: 33,
    width: width - 56,
    resizeMode: "contain"
  },
  forestGreenText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginBottom: 7
  },
  missionContainer: {
    alignItems: "flex-start",
    marginTop: 21,
    marginBottom: 46,
    backgroundColor: colors.white,
    marginHorizontal: 27
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
  italicText: {
    marginHorizontal: 27,
    textAlign: "center",
    marginTop: 33,
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21
  },
  greenButton: {
    backgroundColor: colors.seekForestGreen,
    width: height < 570 ? 292 : 317,
    height: 52,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    paddingTop: padding.iOSPadding,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    color: colors.white
  },
  heatMap: {
    width,
    height: 227,
    resizeMode: "cover",
    overflow: "hidden"
  },
  image: {
    width,
    height: 286,
    resizeMode: "cover"
  },
  caption: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
    width: 245
  },
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  photoContainer: {
    height: 350
  },
  touchable,
  leftArrow: {
    zIndex: 1,
    position: "absolute",
    top: 137,
    left: 5
  },
  rightArrow: {
    zIndex: 1,
    position: "absolute",
    top: 137,
    right: 5
  },
  loginText: {
    maxWidth: 334,
    marginTop: 32,
    marginBottom: 28,
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 16,
    lineHeight: 21,
    fontFamily: fonts.book,
    color: colors.black
  }
} );
