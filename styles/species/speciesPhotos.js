// @flow

import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "screen" );

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  ccButton: {
    bottom: 0,
    padding: 15,
    position: "absolute",
    right: 0,
    zIndex: 1
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
    backgroundColor: colors.black,
    borderRadius: 40,
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16,
    paddingBottom: Platform.OS === "ios" ? 3 : 5,
    paddingHorizontal: 5,
    paddingTop: Platform.OS === "ios" ? 8 : 5
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
