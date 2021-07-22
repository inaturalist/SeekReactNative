// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  row
} from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  bullet: {
    marginRight: 18
  },
  marginTop: {
    marginTop: 7
  },
  row
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  taxonomyHeader: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 21
  },
  speciesTaxonomyHeader: {
    fontFamily: fonts.semiboldItalic
  },
  taxonomyText: {
    color: colors.black,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: fonts.book,
    maxWidth: 200
  },
  scientificName: {
    fontFamily: fonts.bookItalic
  }
} );

export {
  textStyles,
  viewStyles
};
