import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  padding,
  touchable
} from "../global";

export default StyleSheet.create( {
  innerContainer: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    backgroundColor: colors.white,
    overflow: "hidden"
  },
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    height: 186,
    overflow: "visible"
  },
  buttonContainer: {
    marginTop: 40,
    marginBottom: 10
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    flexWrap: "nowrap"
  },
  imageCell: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2
  },
  textContainer: {
    marginTop: 50,
    marginHorizontal: 24,
    alignItems: "center"
  },
  headerText: {
    textAlign: "center",
    paddingTop: padding.iOSPadding,
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    lineHeight: 24,
    letterSpacing: 1.0,
    marginBottom: 24
  },
  speciesText: {
    textAlign: "center",
    fontFamily: fonts.book,
    fontSize: 30,
    lineHeight: 35,
    color: colors.black,
    marginBottom: 8
  },
  text: {
    width: 292,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    color: colors.black,
    fontFamily: fonts.book
  },
  button: {
    backgroundColor: colors.seekForestGreen,
    width: 292,
    height: 46,
    marginTop: 28,
    marginBottom: 28,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    fontFamily: fonts.semibold,
    fontSize: 18,
    color: colors.white,
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    letterSpacing: 1.0
  },
  backButton: {
    top: 18,
    left: 23
  },
  linkText: {
    fontFamily: fonts.book,
    fontSize: 18,
    color: "#9b9b9b",
    textDecorationLine: "underline"
  },
  buttonGray: {
    backgroundColor: "#5e5e5e"
  },
  buttonBlue: {
    backgroundColor: colors.seekTeal
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  imageBackground: {
    height: "100%",
    width: "100%"
  },
  loadingWheel: {
    position: "absolute",
    left: "50%",
    top: "50%"
  },
  touchable
} );
