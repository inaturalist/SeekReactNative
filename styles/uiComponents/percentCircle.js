// @flow

import { StyleSheet } from "react-native";
import { fonts, padding, center } from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center,
  circleStyle: {
    height: 59,
    width: 59
  },
  largeCircleStyle: {
    height: 113,
    width: 113
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  circleText: {
    fontFamily: fonts.book,
    fontSize: 20,
    paddingTop: padding.iOSButtonPadding
  },
  largeCircleText: {
    fontFamily: fonts.light,
    fontSize: 30,
    paddingTop: padding.iOSPadding
  }
} );

export {
  textStyles,
  viewStyles
};
