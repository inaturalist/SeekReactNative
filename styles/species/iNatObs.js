// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  row,
  center
} from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {

  center,
  margin: {
    marginTop: 28
  },
  row,
  textContainer: {
    marginLeft: 36
  }
} );


const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  number: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 20,
    lineHeight: 21,
    marginTop: 7
  },
  secondHeaderText: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  bird: {
    height: 65,
    resizeMode: "contain",
    width: 73
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
