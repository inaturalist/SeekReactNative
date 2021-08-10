// @flow

import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  row,
  center,
  padding,
  dimensions
} from "./global";

const { width } = dimensions;

const greenButton = {
  color: colors.white,
  fontFamily: fonts.semibold,
  fontSize: 20,
  // removed because letters getting cut off on left side, android
  letterSpacing: Platform.OS === "ios" ? 1.11 : 0,
  backgroundColor: colors.seekForestGreen,
  borderRadius: 6,
  paddingBottom: 11,
  paddingHorizontal: 18,
  textAlign: "center",
  paddingTop: 12
};

const buttonContainer = {
  paddingVertical: 19,
  alignItems: "center"
};

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center,
  checkBox: {
    paddingRight: 10.3
  },
  checkboxRow: {
    marginTop: 17
  },
  greenButton: {
    backgroundColor: colors.seekForestGreen,
    borderRadius: 6,
    paddingBottom: 11,
    paddingHorizontal: 18,
    paddingTop: Platform.OS === "ios" ? 18 : 12
  },
  leftMargin: {
    marginBottom: 5,
    marginLeft: 10
  },
  margin: {
    marginTop: 35
  },
  marginGreenButton: {
    marginTop: 19
  },
  marginHorizontal: {
    justifyContent: "space-between",
    marginHorizontal: 28
  },
  tabletContainer: {
    maxWidth: 455,
    alignSelf: "center"
  },
  marginMedium: {
    marginTop: 22
  },
  marginSmall: {
    marginTop: 15
  },
  marginTop: {
    marginTop: 24
  },
  padding: {
    paddingTop: padding.iOSPaddingSmall
  },
  radioButtonSmallMargin: {
    paddingTop: 19 / 2
  },
  radioMargin: {
    paddingVertical: 19 / 2,
    paddingLeft: 20
  },
  donateMarginBottom: {
    paddingTop: 35 - 19
  },
  radioButtonMarginBottom: {
    paddingTop: 35 - ( 19 / 2 )
  },
  row,
  switch: {
    paddingVertical: 19 / 2,
    marginRight: 10
  },
  // $FlowFixMe
  inputIOS: greenButton,
  inputIOSContainer: buttonContainer,
  // $FlowFixMe
  inputAndroid: greenButton,
  inputAndroidContainer: buttonContainer
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  subHeader: {
    color: colors.settingsGray,
    fontFamily: fonts.semibold,
    fontSize: 17,
    letterSpacing: 0.94
  },
  header: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  languageText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 20,
    letterSpacing: 1.11
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  seasonalityRadioButtonText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    maxWidth: width - ( 28 * 2 ) - 30 - 10.3,
    marginTop: -3
  },
  autoCaptureText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    paddingTop: padding.iOSPaddingSmall,
    maxWidth: width - ( 28 * 2 ) - 30 - 10.3
  }
} );

export {
  textStyles,
  viewStyles
};
