// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  container: {
    flexGrow: 1,
    justifyContent: "center",
    marginHorizontal: 28
  },
  greenButtonMargin: {
    marginTop: 32
  }
} );


const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  headerText: {
    alignSelf: "center",
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    maxWidth: 279,
    textAlign: "center"
  },
  text: {
    alignSelf: "center",
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 24,
    maxWidth: 455,
    textAlign: "center"
  }
} );

export {
  viewStyles,
  textStyles
};
