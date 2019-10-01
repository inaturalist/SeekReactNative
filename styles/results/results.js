import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  padding,
  touchable
} from "../global";

export default StyleSheet.create( {
  backButton: {
    left: 23,
    top: 18
  },
  button: {
    alignItems: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 40,
    height: 46,
    justifyContent: "center",
    marginBottom: 28,
    marginTop: 28,
    width: 292
  },
  buttonBlue: {
    backgroundColor: colors.seekTeal
  },
  buttonContainer: {
    marginBottom: 10,
    marginTop: 40
  },
  buttonGray: {
    backgroundColor: "#5e5e5e"
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    textAlign: "center"
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  header: {
    height: 186,
    overflow: "visible"
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginBottom: 24,
    paddingTop: padding.iOSPadding,
    textAlign: "center"
  },
  imageBackground: {
    height: "100%",
    width: "100%"
  },
  imageCell: {
    borderRadius: 150 / 2,
    height: 150,
    width: 150
  },
  imageContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-around"
  },
  innerContainer: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden"
  },
  linkText: {
    color: "#9b9b9b",
    fontFamily: fonts.book,
    fontSize: 18,
    textDecorationLine: "underline"
  },
  loadingWheel: {
    left: "50%",
    position: "absolute",
    top: "50%"
  },
  speciesText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 8,
    textAlign: "center"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    width: 292
  },
  textContainer: {
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 50
  },
  touchable
} );
