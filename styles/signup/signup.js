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
    paddingTop: padding.iOSPadding
  },
  center,
  checkBox: {
    paddingBottom: 18,
    paddingLeft: 34,
    paddingRight: 18,
    paddingTop: 18
  },
  container: {
    flex: 1
  },
  darkText: {
    color: colors.black,
    fontSize: 20,
    textAlign: "center"
  },
  dateButton: {
    alignItems: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 6,
    height: 43,
    justifyContent: "center",
    paddingHorizontal: 14
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
  inputField: {
    backgroundColor: colors.white,
    borderColor: colors.darkGray,
    borderRadius: 40,
    borderWidth: 1,
    color: colors.black,
    height: 37,
    paddingLeft: 15,
    width: 307
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
    // maxWidth: 253
  },
  margin: {
    marginTop: ( Platform.OS === "android" || height < 570 ) ? 10 : 17
  },
  marginLeft: {
    marginLeft: 76
  },
  privacy: {
    color: colors.seekForestGreen,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 22,
    textAlign: "center",
    textDecorationLine: "underline"
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
  }
} );
