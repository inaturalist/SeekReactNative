// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

import type {
  ViewStyleProp,
  TextStyleProp
} from "react-native/Libraries/StyleSheet/StyleSheet";

const maxColumnWidth = 455;

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  whiteContainer: {
    paddingTop: 35,
    backgroundColor: colors.white
  },
  textContainer: {
    paddingHorizontal: 33,
    paddingTop: 21
  },
  landscapeContainerRestrictedWidth: {
    width: maxColumnWidth,
    alignSelf: "center"
  },
  marginGreenButtonLarge: {
    marginTop: 33
  },

  marginBottom: {
    marginTop: 48
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  header: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    paddingLeft: 22
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  }
} );

export { viewStyles, textStyles };
