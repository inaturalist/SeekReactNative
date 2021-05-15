// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  container: {
    marginHorizontal: 23,
    marginTop: 32
  },
  margin: {
    marginTop: 30
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  italicText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21,
    marginHorizontal: 15,
    textAlign: "center"
  },
  loginText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 28,
    marginHorizontal: 15,
    maxWidth: 334,
    textAlign: "center"
  }
} );

export {
  viewStyles,
  textStyles
};
