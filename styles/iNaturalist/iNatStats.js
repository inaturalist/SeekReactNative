// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center,
  dimensions
} from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center,
  textContainer: {
    marginHorizontal: 27
  },
  photoMargins: {
    marginVertical: 33
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  secondHeaderText: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: 19,
    lineHeight: 24,
    marginBottom: 10
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  caption: {
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    width: 245
  },
  loginLogoutText: {
    marginTop: 19,
    marginBottom: 33
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  image: {
    height: 286,
    resizeMode: "cover",
    width: dimensions.width
  }
} );

export {
  viewStyles,
  textStyles,
  imageStyles
};
