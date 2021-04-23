// @flow

import { StyleSheet } from "react-native";
import { dimensions } from "../global";

import type { ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  fullSizeImage: {
    height: dimensions.height,
    width: dimensions.width,
    resizeMode: "stretch"
  }
} );

export default imageStyles;
