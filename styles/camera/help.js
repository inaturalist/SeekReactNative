// @flow

import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts, row } from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const { width, height } = Dimensions.get( "window" );

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  howText: {
    marginRight: 36,
    width: height > 570 ? 192 : 140
  },
  row,
  textContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 30,
    marginTop: 20
  },
  tipContainer: {
    width: height > 570 ? 260 : 230
  },
  tips: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 11
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  bullets: {
    fontSize: 26,
    lineHeight: 21,
    marginLeft: 13,
    marginRight: 20,
    marginTop: 3
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    marginBottom: 11,
    marginTop: 35
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  topImage: {
    height: width / 2.5,
    resizeMode: "cover",
    width
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
