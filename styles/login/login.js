import { StyleSheet, Platform, Dimensions } from "react-native";

import { fonts, colors } from "../global";

const { width } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 294,
    height: 105,
    resizeMode: "contain",
    marginBottom: 50
  },
  headerText: {
    marginTop: 50,
    marginHorizontal: 40,
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 26,
    lineHeight: 30
  },
  keyboardHeaderText: {
    marginTop: ( width > 350 ) ? 50 : 20
  },
  secondHeaderTextContainer: {
    marginHorizontal: 20
  },
  aboutTextContainer: {
    marginTop: 20,
    marginHorizontal: 35
  },
  text: {
    textAlign: "center",
    fontFamily: fonts.default,
    fontSize: 17,
    color: colors.white
  },
  leftTextContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignSelf: "flex-start",
    marginLeft: 27,
    marginTop: 10,
    marginBottom: 5
  },
  leftText: {
    fontFamily: fonts.default,
    fontSize: 16,
    color: colors.white
  },
  rightTextContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignSelf: "flex-end",
    marginRight: 25,
    marginTop: 10,
    marginBottom: 10
  },
  textLink: {
    marginTop: 30,
    fontFamily: fonts.book,
    fontSize: 19,
    color: colors.white,
    textDecorationLine: "underline"
  },
  forgotPasswordText: {
    fontFamily: fonts.book,
    fontSize: 16,
    color: colors.white,
    textDecorationLine: "underline"
  },
  darkText: {
    color: colors.black,
    fontSize: 20,
    textAlign: "center"
  },
  datePickerContainer: {
    marginTop: Platform.OS === "android" ? 40 : null,
    marginBottom: Platform.OS === "android" ? 60 : null,
    alignItems: Platform.OS === "android" ? "center" : null,
    flex: Platform.OS === "ios" ? 1 : null,
    justifyContent: "center"
  },
  datePickerInputField: {
    width: 307,
    textAlign: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    height: 37,
    borderRadius: 40
  },
  inputField: {
    width: 307,
    backgroundColor: colors.white,
    height: 37,
    borderRadius: 40,
    paddingLeft: 15
  },
  greenButton: {
    backgroundColor: colors.seekiNatGreen,
    width: 274,
    height: 52,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4
  },
  buttonText: {
    paddingTop: Platform.OS === "ios" ? 7 : null,
    fontFamily: fonts.semibold,
    fontSize: 22,
    color: colors.white
  },
  secondHeaderText: {
    textAlign: "center",
    fontFamily: fonts.book,
    fontSize: 22,
    color: colors.white,
    lineHeight: 30
  },
  keyboardSecondHeaderText: {
    fontSize: ( width > 350 ) ? 22 : 20,
    lineHeight: ( width > 350 ) ? 30 : 28
  },
  licenseText: {
    fontFamily: fonts.book,
    fontSize: 17,
    lineHeight: 23,
    color: colors.white
  },
  row: {
    marginTop: 30,
    marginBottom: 30,
    marginHorizontal: 40,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center"
  }
} );
