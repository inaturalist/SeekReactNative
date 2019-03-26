import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  padding
} from "../global";

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
    backgroundColor: "transparent"
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
    marginBottom: 26
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
    marginBottom: 40,
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
    marginTop: 20,
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21
  },
  greenButton: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 24,
    width: "95%",
    height: 52
  },
  buttonText: {
    fontFamily: fonts.semibold,
    paddingTop: padding.iOSPadding,
    fontSize: 22,
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
    height: 186,
    resizeMode: "contain"
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
    height: 251
  },
  touchable: {
    left: 23,
    right: 23,
    top: 23,
    bottom: 23
  }
} );
