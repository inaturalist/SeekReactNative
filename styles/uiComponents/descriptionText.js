// @flow

import { StyleSheet } from "react-native";
import { fonts, colors, dimensions } from "../global";

export default StyleSheet.create( {
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: dimensions.height > 570 ? 16 : 14,
    lineHeight: dimensions.height > 570 ? 21 : 14
  }
} );
