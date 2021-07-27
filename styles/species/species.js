// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, row, dimensions } from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const columnWidth = dimensions.width / 4 * 3;

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  backButton: {
    left: 0,
    paddingBottom: 18,
    paddingHorizontal: 23,
    paddingTop: 23,
    position: "absolute",
    zIndex: 1
  },
  background: {
    backgroundColor: colors.white
  },
  landscapeBackground: {
    backgroundColor: colors.white,
    width: columnWidth,
    paddingBottom: 100
  },
  twoColumnContainer: {
    flexWrap: "wrap",
    backgroundColor: colors.white
  },
  checkmark: {
    marginRight: 10
  },
  greenBanner: {
    backgroundColor: colors.seekForestGreen
  },
  headerMargins: {
    marginBottom: 11,
    marginTop: 45
  },
  marginSmall: {
    marginTop: 21
  },
  row,
  rowMargin: {
    marginTop: 28
  },
  textContainer: {
    marginHorizontal: 28
  },
  seenDateContainer: {
    marginHorizontal: 28
  },
  pressableArea: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 28
  },
  selectedPressableArea: {
    backgroundColor: "rgb(176, 196, 222)",
    alignSelf: "flex-start"
  },
  copiedAnimation: {
    zIndex: 1,
    alignSelf: "center",
    position: "absolute",
    top: -35
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  commonNameText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 30,
    letterSpacing: 0.3,
    lineHeight: 31,
    marginTop: 23,
    marginHorizontal: 28
  },
  humanText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 45,
    textAlign: "center"
  },
  italicText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21
  },
  iconicTaxaText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    paddingLeft: 28,
    paddingVertical: 12,
    backgroundColor: colors.seekForestGreen
  },
  linkText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    paddingTop: 10,
    textDecorationLine: "underline"
  },
  scientificNameText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 19,
    lineHeight: 21
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  }
} );

export {
  viewStyles,
  textStyles
};
