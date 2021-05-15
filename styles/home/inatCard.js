// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center,
  row
} from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center,
  secondHeader: {
    marginTop: 23,
    marginBottom: 10
  },
  marginSmall: {
    marginTop: 23
  },
  marginOpenINat: {
    marginTop: 33
  },
  row,
  container: {
    backgroundColor: colors.white,
    marginHorizontal: 22,
    marginTop: 45
  },
  topMarginWithChallenge: {
    marginTop: 31
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 12
  },
  secondHeaderText: {
    marginLeft: 24,
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    width: 195
  },
  linkText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textDecorationLine: "underline",
    alignSelf: "center",
    paddingTop: 23,
    paddingBottom: 33
  },
  lightText: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 14,
    letterSpacing: 0.61,
    marginLeft: 24,
    marginBottom: 2
  }
} );

export {
  viewStyles,
  textStyles
};
