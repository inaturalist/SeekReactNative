// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, dimensions } from "../../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  noTaxon: {
    width: dimensions.width,
    alignItems: "center",
    justifyContent: "center"
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  cellTitleText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 322
  }
} );

export {
  textStyles,
  viewStyles
};
