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
  bullets: {
    marginHorizontal: 14
  },
  bulletWidth: {
    maxWidth: 284
  },
  secondHeader: {
    marginVertical: 23
  },
  marginSmall: {
    marginTop: 23
  },
  row,
  container: {
    backgroundColor: colors.white,
    marginHorizontal: 22,
    marginTop: 45
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 11
  },
  secondHeaderText: {
    marginLeft: 24,
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    width: 195
  },
  marginRight: {
    fontSize: 23,
    marginRight: 14
  },
  linkText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textDecorationLine: "underline",
    alignSelf: "center",
    paddingTop: 23,
    paddingBottom: 33
  }
} );

export {
  viewStyles,
  textStyles
};
