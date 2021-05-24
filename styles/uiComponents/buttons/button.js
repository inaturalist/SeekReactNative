// @flow

import { StyleSheet, Platform } from "react-native";
import {
  center,
  colors,
  fonts,
  dimensions
} from "../../global";
import { enabledLargeFonts } from "../../../utility/textHelpers";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  button: {
    backgroundColor: colors.red,
    borderRadius: 40,
    height: enabledLargeFonts() ? 79 : 46,
    width: 243
  },
  center,
  extraPadding: {
    paddingHorizontal: 26
  },
  largeButton: {
    height: 79,
    width: 278
  },
  login: {
    maxWidth: 317,
    width: dimensions.width - 70
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    paddingTop: Platform.OS === "ios" ? 3 : 0,
    textAlign: "center"
  },
  greenText: {
    color: colors.seekForestGreen
  }
} );

export {
  viewStyles,
  textStyles
};
