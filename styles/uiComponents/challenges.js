
// @flow

import { StyleSheet, PixelRatio } from "react-native";
import {
  colors,
  fonts,
  row,
  center
} from "../global";

const fontScale = PixelRatio.getFontScale( );

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center,
  marginMiddle: {
    marginRight: 29
  },
  row
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  challengeHeader: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: ( fontScale > 1 ) ? 16 : 18,
    letterSpacing: 0.78,
    marginHorizontal: 31
  },
  challengeName: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 20 : 23,
    letterSpacing: 1.0,
    marginTop: 5,
    marginHorizontal: 31
  },
  longText: {
    fontSize: 14,
    lineHeight: 21
  },
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 178,
    textAlign: "center"
  },
  textSmall: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 178
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  white: {
    tintColor: colors.white
  },
  badge: {
    height: 105,
    resizeMode: "contain",
    width: 105
  },
  badgeSmall: {
    height: 79,
    resizeMode: "contain",
    width: 79
  }
} );

export {
  viewStyles,
  textStyles,
  imageStyles
};

