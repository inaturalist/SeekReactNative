// @flow

import { StyleSheet } from "react-native";

import {
  fonts,
  colors,
  row,
  center
} from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center,
  marginLeft: {
    marginLeft: 14
  },
  row
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  textLink: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 17,
    marginTop: 26,
    textDecorationLine: "underline"
  },
  signupTextLink: {
    color: colors.seekForestGreen,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 23,
    textAlign: "center"
  }
} );

export {
  viewStyles,
  textStyles
};
