// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  marginMedium: {
    marginTop: 26
  },
  marginSmall: {
    marginTop: 16
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  speciesText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 8,
    textAlign: "center"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 23,
    maxWidth: 244,
    textAlign: "center"
  },
  scientificName: {
    fontFamily: fonts.bookItalic
  }
} );


export {
  textStyles,
  viewStyles
};
