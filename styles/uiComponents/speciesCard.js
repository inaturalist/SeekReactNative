// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  row,
  dimensions
} from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  image: {
    borderRadius: 80 / 2,
    height: 80,
    marginRight: 24,
    width: 80
  },
  notTouchable: {
    width: 276
  },
  row,
  speciesNameContainer: {
    maxWidth: 220
  },
  touchableArea: {
    width: dimensions.width
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  commonNameText: {
    color: colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.book,
    fontSize: 21,
    lineHeight: 21
  },
  scientificNameText: {
    color: colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    marginTop: 12
  }
} );

export {
  viewStyles,
  textStyles
};
