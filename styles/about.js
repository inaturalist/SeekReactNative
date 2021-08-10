// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, row } from "./global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  block: {
    marginBottom: 34
  },
  debug: {
    paddingBottom: 17,
    paddingHorizontal: 20,
    paddingTop: 27
  },
  margin: {
    marginBottom: 27
  },
  marginLarge: {
    marginTop: 38
  },
  marginLeft: {
    marginLeft: 20
  },
  marginSmall: {
    marginTop: 22
  },
  marginSmallest: {
    marginTop: 17
  },
  row,
  textContainer: {
    alignItems: "center",
    marginHorizontal: 26,
    marginTop: 31
  },
  tabletContainer: {
    maxWidth: 455,
    alignSelf: "center"
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  boldText: {
    fontFamily: fonts.semibold,
    marginBottom: 5
  },
  greenText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  image: {
    height: 54,
    resizeMode: "contain",
    width: 307
  },
  wwfop: {
    height: 80,
    resizeMode: "contain",
    width: 240
  }
} );

export {
  viewStyles,
  textStyles,
  imageStyles
};
