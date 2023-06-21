// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  back: {
    padding: 18,
    position: "absolute",
    right: 23 - 18,
    top: 0
  },
  bottom: {
    backgroundColor: colors.seekForestGreen,
    height: 60
  },
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    height: 55
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    alignSelf: "center",
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    top: 19
  }
} );

export {
  viewStyles,
  textStyles
};
