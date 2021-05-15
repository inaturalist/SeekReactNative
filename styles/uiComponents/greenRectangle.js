// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, padding } from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  greenButton: {
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 6,
    paddingVertical: 6
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  greenButtonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16,
    letterSpacing: 0.89,
    paddingHorizontal: 10,
    paddingTop: padding.iOSButtonPadding
  }
} );

export {
  textStyles,
  viewStyles
};
