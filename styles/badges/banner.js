// @flow

import { StyleSheet, Platform } from "react-native";
import { colors, fonts } from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  banner: {
    height: 48,
    marginBottom: 32,
    marginTop: 40,
    paddingTop: Platform.OS === "android" ? 5 : 8,
    width: 284,
    alignSelf: "center"
  },
  modal: {
    marginBottom: 26,
    marginTop: 32
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  bannerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    textAlign: "center"
  }
} );

export {
  textStyles,
  viewStyles
};
