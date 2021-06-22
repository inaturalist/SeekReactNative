// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  row
} from "../global";

export default StyleSheet.create( {
  bullet: {
    marginRight: 18
  },
  marginTop: {
    marginTop: 7
  },
  row,
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
