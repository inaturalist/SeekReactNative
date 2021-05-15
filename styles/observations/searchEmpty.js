// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 43 - 24
  },
  margin: {
    marginTop: 42
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  headerText: {
    textAlign: "center",
    fontFamily: fonts.medium,
    color: colors.black,
    fontSize: 19,
    lineHeight: 24,
    width: 247
  }
} );

export {
  textStyles,
  viewStyles
};
