import { StyleSheet, Platform, Dimensions } from "react-native";

import {
  fonts,
  colors,
  padding,
  center,
  row,
  dimensions
} from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: padding.iOSPaddingFontSize18
  },
  center,
  checkBox: {
    paddingBottom: 18,
    paddingLeft: 34,
    paddingRight: 18,
    paddingTop: 18
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  darkText: {
    color: colors.black,
    fontSize: 20,
    textAlign: "center"
  },
  dateButton: {
    alignSelf: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 6,
    height: 43,
    width: 237
  },
  flexCenter: {
    flexGrow: 1,
    justifyContent: "center"
  },
  greenButtonMargin: {
    marginTop: dimensions.height < 570 ? 10 : 51
  },
  header: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    marginHorizontal: 22,
    textAlign: "center"
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0,
    lineHeight: 30,
    marginTop: 22,
    textAlign: "center"
  },
  whiteContainer: {
    backgroundColor: colors.white
  },
  keyboardText: {
    marginHorizontal: ( Platform.OS === "android" || height < 570 ) ? 24 : 28,
    marginTop: ( Platform.OS === "android" || height < 570 ) ? 10 : 20
  },
  leftTextMargins: {
    alignSelf: "flex-start",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 8,
    marginLeft: 39,
    marginTop: 16
  },
  licenseText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    maxWidth: dimensions.width / 2 + 80
  },
  margin: {
    marginTop: ( Platform.OS === "android" || height < 570 ) ? 10 : 17
  },
  marginExtraLarge: {
    marginBottom: 98
  },
  marginLarge: {
    marginBottom: 68
  },
  marginLeft: {
    marginLeft: 76
  },
  marginLeftSmall: {
    marginLeft: 14
  },
  marginSmall: {
    marginTop: 2
  },
  marginTopSmall: {
    marginTop: 29
  },
  marginTop: {
    marginTop: 51
  },
  row,
  secondHeaderText: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 22,
    lineHeight: 30,
    textAlign: "center"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 21,
    marginHorizontal: 38,
    marginTop: 20,
    textAlign: "center"
  },
  linkText: {
    color: colors.seekForestGreen,
    textDecorationLine: "underline"
  }
} );
