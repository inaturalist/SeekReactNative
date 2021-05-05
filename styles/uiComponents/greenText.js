// @flow

import { StyleSheet } from "react-native";
import { fonts, colors } from "../global";
import type { TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  center: {
    textAlign: "center"
  },
  greenHeaderText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  smallerText: {
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24
  }
} );

export default textStyles;
