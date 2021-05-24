// @flow

import { StyleSheet, PixelRatio } from "react-native";
import {
  colors,
  fonts,
  padding,
  dimensions
} from "../../global";

const { getFontScale } = PixelRatio;

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  greenButton: {
    alignSelf: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 34,
    height: getFontScale() > 1 ? 79 : 46,
    justifyContent: "center",
    maxWidth: 317,
    width: dimensions.width < 500 ? 293 : 317
  },
  loginHeight: {
    height: 52,
    marginHorizontal: dimensions.height > 570 ? 34 : 20
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: padding.iOSButtonPadding,
    textAlign: "center"
  }
} );

export {
  viewStyles,
  textStyles
};
