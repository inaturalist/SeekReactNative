// @flow

import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { height } = Dimensions.get( "window" );

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  backgroundColor: {
    alignItems: "center",
    width: "100%"
  },
  headerMargins: {
    marginBottom: Platform.OS === "android" ? 19 : 15,
    marginTop: 25
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  nameText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0,
    marginBottom: height > 570 ? 43 : 30,
    marginTop: 32
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 24,
    marginHorizontal: 40,
    marginTop: 16,
    textAlign: "center"
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  image: {
    height: height > 640 ? 258 : 215,
    marginTop: height > 570 ? 50 : 30,
    resizeMode: "contain",
    width: height > 640 ? 258 : 215
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
