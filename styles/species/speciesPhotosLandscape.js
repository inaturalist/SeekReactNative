// @flow

import { StyleSheet, Platform } from "react-native";
import {
  colors,
  dimensions,
  fonts
} from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  landscapeBackground: {
    backgroundColor: colors.black
  },
  emptyBackground: {
    backgroundColor: colors.black,
    height: dimensions.height
  },
  footer: {
    padding: 100,
    backgroundColor: colors.black
  },
  imagePadding: {
    paddingBottom: 20
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
  ccButtonLandscape: {
    fontFamily: fonts.light
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  image: {
    resizeMode: "cover"
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
