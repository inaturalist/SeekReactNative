// @flow

import { Dimensions, StyleSheet, Platform } from "react-native";
import { colors, fonts } from "../global";

const { width, height } = Dimensions.get( "screen" );

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  legend: {
    backgroundColor: colors.seekForestGreen,
    borderTopRightRadius: 40,
    paddingBottom: ( Platform.OS === "ios" && height > 670 ) ? 23 : 13,
    paddingLeft: 22,
    paddingRight: 28,
    bottom: 0,
    left: 0,
    position: "absolute"
  },
  legendHeader: {
    backgroundColor: colors.seekForestGreen,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 56,
    width: "100%"
  },
  locationIcon: {
    bottom: 19,
    position: "absolute",
    right: 19
  },
  map: {
    height: height - 75,
    width
  },
  marginHorizontal: {
    marginHorizontal: 4.5
  },
  marginLarge: {
    marginTop: 29
  },
  marginSmall: {
    marginTop: 7
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginHorizontal: 25,
    marginTop: 15
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginLeft: 21,
    marginTop: 3
  },
  whiteText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    marginTop: 18,
    textAlign: "center"
  }
} );

export {
  textStyles,
  viewStyles
};
