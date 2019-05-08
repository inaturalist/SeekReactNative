import { StyleSheet, Platform, Dimensions } from "react-native";

import { fonts, colors, padding } from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: ( Platform.OS === "android" || height > 320 ) ? null : 1
  },
  inputField: {
    width: 307,
    backgroundColor: colors.white,
    height: 37,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.darkGray,
    paddingLeft: 15
  },
  dateButton: {
    backgroundColor: colors.seekForestGreen,
    paddingHorizontal: 14,
    height: 43,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center"
  },
  greenButton: {
    backgroundColor: colors.seekForestGreen,
    width: 317,
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
  header: {
    textAlign: "center",
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24
  },
  margin: {
    marginTop: ( Platform.OS === "android" || height > 320 ) ? 0 : 22
  },
  greenButtonMargin: {
    marginTop: ( Platform.OS === "android" || height > 320 ) ? 10 : 58
  },
  headerText: {
    marginTop: 22,
    textAlign: "center",
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 23,
    lineHeight: 30,
    letterSpacing: 1.0
  },
  privacy: {
    marginTop: 22,
    textAlign: "center",
    color: colors.seekForestGreen,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textDecorationLine: "underline"
  },
  keyboardText: {
    marginTop: ( Platform.OS === "android" || height > 320 ) ? 10 : 20,
    marginHorizontal: ( Platform.OS === "android" || height > 320 ) ? 24 : 28
  },
  text: {
    marginHorizontal: 38,
    marginTop: 20,
    textAlign: "center",
    fontFamily: fonts.medium,
    fontSize: 16,
    color: colors.black,
    lineHeight: 21
  },
  leftTextContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignSelf: "flex-start",
    marginLeft: 39,
    marginTop: 16,
    marginBottom: 8
  },
  leftText: {
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    color: colors.seekForestGreen
  },
  darkText: {
    color: colors.black,
    fontSize: 20,
    textAlign: "center"
  },
  secondHeaderText: {
    textAlign: "center",
    fontFamily: fonts.book,
    fontSize: 22,
    color: colors.white,
    lineHeight: 30
  },
  row: {
    marginTop: 35,
    marginBottom: 104,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  licenseText: {
    maxWidth: 253,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  },
  checkBox: {
    marginRight: 18
  }
} );
