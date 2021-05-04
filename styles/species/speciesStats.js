// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, padding } from "../global";

const spaceBelowTags = 6;

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  tag: {
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 6,
    flexDirection: "row",
    marginBottom: spaceBelowTags,
    marginRight: 10,
    paddingBottom: 4,
    paddingTop: 4
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 28
  },
  tagAndSeenDate: {
    marginBottom: 26 - spaceBelowTags
  },
  noTags: {
    marginTop: 29
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  tagText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingHorizontal: 9,
    paddingTop: padding.iOSButtonPadding
  }
} );

export {
  viewStyles,
  textStyles
};
