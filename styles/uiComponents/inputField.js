// @flow

import { StyleSheet } from "react-native";
import { colors, dimensions } from "../global";

import type { TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  inputField: {
    backgroundColor: colors.white,
    borderColor: colors.darkGray,
    borderRadius: 40,
    borderWidth: 1,
    color: colors.black,
    height: 37,
    marginHorizontal: dimensions.height > 570 ? 34 : 20,
    paddingLeft: 15
  }
} );

export default textStyles;
