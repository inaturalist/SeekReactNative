// @flow

import { StyleSheet } from "react-native";
import { fonts, colors, dimensions } from "../global";

import type { TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: dimensions.height > 570 ? 16 : 14,
    lineHeight: dimensions.height > 570 ? 21 : 14
  }
} );

export default textStyles;
