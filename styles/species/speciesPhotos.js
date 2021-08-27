// @flow

import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts } from "../global";

const { width } = Dimensions.get( "screen" );

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  ccButton: {
    bottom: 14,
    padding: 6,
    position: "absolute",
    right: 15,
    zIndex: 1,
    backgroundColor: colors.ccGray,
    borderRadius: 50
  },
  photoContainer: {
    backgroundColor: colors.black,
    height: 250,
    width
  },
  errorContainer: {
    justifyContent: "center",
    backgroundColor: colors.black,
    height: 250
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  ccButtonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16
  },
  errorText: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center"
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  image: {
    height: 250,
    resizeMode: "contain",
    width
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
