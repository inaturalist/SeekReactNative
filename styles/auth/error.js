// @flow

import { StyleSheet } from "react-native";
import {
  fonts,
  colors,
  dimensions,
  row
} from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  errorMargin: {
    justifyContent: "center",
    marginBottom: dimensions.height > 570 ? 27 : 18,
    marginHorizontal: dimensions.height > 570 ? 34 : 20,
    marginTop: dimensions.height > 570 ? 30 : 21
  },
  row,
  smallerMargin: {
    marginTop: dimensions.height > 570 ? 19 : 10
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    color: colors.seekiNatGreen,
    fontFamily: fonts.semibold,
    fontSize: 17
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  image: {
    height: 24,
    marginRight: 15,
    resizeMode: "contain",
    tintColor: colors.seekiNatGreen,
    width: 27
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
