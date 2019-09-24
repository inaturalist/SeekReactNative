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
    justifyContent: "center"
  },
  greenHeaderText: {
    marginTop: 22,
    textAlign: "center",
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 23,
    lineHeight: 30,
    letterSpacing: 1.0
  },
  inputField: {
    width: 307,
    backgroundColor: colors.white,
    color: colors.black,
    height: 37,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.darkGray,
    paddingLeft: 15
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
  image: {
    width: height < 570 ? 150 : 264,
    height: height < 570 ? 150 : 264,
    resizeMode: "contain",
    marginTop: 36,
    marginBottom: 44
  },
  headerText: {
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0
  },
  greenHeader: {
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.seekForestGreen
  },
  loginSuccessHeaderText: {
    fontSize: 18,
    color: colors.white,
    letterSpacing: 1.0,
    fontFamily: fonts.semibold
  },
  header: {
    textAlign: "center",
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24
  },
  secondHeaderTextContainer: {
    marginTop: 11,
    marginHorizontal: 25
  },
  text: {
    textAlign: "center",
    fontFamily: fonts.medium,
    fontSize: 17,
    lineHeight: 19,
    color: colors.white
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
  rightTextContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignSelf: "flex-end",
    marginRight: 41,
    marginTop: 11
  },
  margin: {
    marginTop: ( Platform.OS === "android" || height < 570 ) ? 10 : 22
  },
  greenButtonMargin: {
    marginTop: ( Platform.OS === "android" || height < 570 ) ? 10 : 28
  },
  textLink: {
    marginTop: 26,
    fontFamily: fonts.book,
    fontSize: 17,
    color: colors.black,
    textDecorationLine: "underline"
  },
  clickableText: {
    left: 10,
    right: 10,
    top: 10,
    bottom: 10
  },
  forgotPasswordText: {
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.seekForestGreen,
    textDecorationLine: "underline"
  },
  secondHeaderText: {
    textAlign: "center",
    fontFamily: fonts.medium,
    fontSize: 19,
    color: colors.white,
    lineHeight: 24
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  textContainer: {
    marginHorizontal: 31
  },
  linkedAccountHeader: {
    marginTop: 26,
    marginBottom: 29,
    textAlign: "center",
    maxWidth: 313,
    fontFamily: fonts.medium,
    fontSize: 22,
    lineHeight: 28,
    color: colors.black
  },
  smallGreenHeaderText: {
    marginBottom: 5,
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 1.0
  },
  descriptionText: {
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  }
} );
