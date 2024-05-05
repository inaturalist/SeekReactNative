import { StyleSheet, Platform } from "react-native";

import {
  fonts,
  colors,
  row,
  center,
  dimensions
} from "../global";

export default StyleSheet.create( {
  center,
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  descriptionText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  email: {
    color: colors.black,
    marginHorizontal: 57,
    marginTop: 21
  },
  flexCenter: {
    flexGrow: 1,
    justifyContent: "center"
  },
  greenButtonMargin: {
    marginTop: dimensions.height < 570 ? 0 : 40
  },
  greenHeader: {
    alignItems: "center",
    backgroundColor: colors.seekForestGreen,
    height: 55,
    justifyContent: "center"
  },
  greenHeaderText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0,
    lineHeight: 30,
    marginTop: 22,
    textAlign: "center"
  },
  header: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    textAlign: "center"
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0,
    textAlign: "center"
  },
  image: {
    height: dimensions.height < 570 ? 150 : 264,
    marginBottom: 44,
    marginTop: 36,
    resizeMode: "contain",
    width: dimensions.height < 570 ? 150 : 264
  },
  leftTextMargins: {
    marginBottom: 8,
    marginLeft: dimensions.height > 570 ? 39 : 25,
    marginTop: 16
  },
  linkedAccountHeader: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 22,
    lineHeight: 28,
    marginBottom: 29,
    marginTop: 26,
    maxWidth: 313,
    textAlign: "center"
  },
  loginSuccessHeaderText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0
  },
  margin: {
    marginTop: ( Platform.OS === "android" || dimensions.height < 570 ) ? 10 : 22
  },
  marginExtraLarge: {
    marginTop: 31
  },
  marginHorizontal: {
    marginHorizontal: 23
  },
  marginLarge: {
    marginTop: 29
  },
  marginMedium: {
    marginTop: 25
  },
  marginSmall: {
    marginTop: 5
  },
  rightTextContainer: {
    alignSelf: "flex-end",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginRight: 41,
    paddingBottom: 11,
    paddingTop: 11
  },
  row,
  secondHeaderText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    textAlign: "center"
  },
  secondHeaderTextContainer: {
    marginHorizontal: 25,
    marginTop: 11
  },
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 17,
    lineHeight: 19,
    textAlign: "center"
  },
  textContainer: {
    alignSelf: "center",
    marginHorizontal: 31,
    maxWidth: 455
  },
  underline: {
    textDecorationLine: "underline"
  }
} );
