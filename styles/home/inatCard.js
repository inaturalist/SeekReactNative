// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center,
  row
} from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const maxColumnWidth = 455;

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
    paddingTop: 45
  },
  topMarginWithChallenge: {
    backgroundColor: colors.white,
    paddingTop: 31
  },
  textContainer: {
    paddingHorizontal: 33
  },
  headerPadding: {
    paddingLeft: 22
  },
  landscapeContainerRestrictedWidth: {
    width: maxColumnWidth,
    alignSelf: "center"
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
  }
} );

export {
  viewStyles,
  textStyles
};
