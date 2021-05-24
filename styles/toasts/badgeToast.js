// @flow

import { StyleSheet } from "react-native";
import { fonts, colors, dimensions } from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  animatedStyle: {
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1
  },
  progress: {
    height: 59,
    position: "absolute",
    right: 24,
    width: 59
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 21,
    backgroundColor: colors.white
  },
  topContainer: {
    zIndex: 1
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  description: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 1
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    marginTop: 16,
    lineHeight: 24,
    maxWidth: dimensions.width - 59 - ( 24 * 2 )
  },
  view: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 21
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  image: {
    height: 75,
    width: 75,
    resizeMode: "contain",
    position: "absolute",
    right: 17
  }
} );

export {
  viewStyles,
  textStyles,
  imageStyles
};
