// @flow

import { StyleSheet, PixelRatio } from "react-native";
import { colors, fonts } from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const fontScale = PixelRatio.getFontScale( );

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  help: {
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 35,
    position: "absolute",
    right: 62
  },
  plantFilter: {
    bottom: 203 - 41,
    position: "absolute"
  },
  plantFilterSettings: {
    bottom: 0,
    paddingHorizontal: 10,
    paddingVertical: 33,
    position: "absolute",
    left: 60
  },
  shutter: {
    bottom: 0,
    paddingHorizontal: 48,
    paddingVertical: 18,
    position: "absolute"
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  scanText: {
    bottom: 26 + 65 + 18,
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 14 : 16,
    lineHeight: 21,
    width: 293,
    position: "absolute",
    textAlign: "center",
    textShadowColor: colors.textShadow,
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3
  }
} );

export {
  viewStyles,
  textStyles
};
