// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center,
  row
} from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center,
  noChallengeTextContainer: {
    marginLeft: 28
  },
  row
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 11
  },
  largeText: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24
  },
  textWidth: {
    width: 195
  }
} );

export {
  viewStyles,
  textStyles
};

