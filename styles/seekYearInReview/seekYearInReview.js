// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, row } from "../global";

import type {
  ViewStyleProp,
  TextStyleProp
} from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  row,
  textContainer: {
    alignItems: "center",
    marginHorizontal: 26,
    marginTop: 31
  },
  tabletContainer: {
    maxWidth: 455,
    alignSelf: "center"
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {

} );

export { viewStyles, textStyles };
