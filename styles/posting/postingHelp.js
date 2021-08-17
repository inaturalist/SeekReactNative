// @flow

import { StyleSheet, Platform } from "react-native";
import { colors, fonts, row } from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  margin: {
    marginTop: 19
  },
  marginRight: {
    marginRight: 10
  },
  paragraph: {
    marginBottom: 16
  },
  row,
  textContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 27,
    marginTop: 30
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  boldText: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 21
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 17,
    justifyContent: "center",
    letterSpacing: 1,
    marginLeft: 21,
    paddingTop: Platform.OS === "ios" ? 6 : 0
  },
  italicText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21,
    marginHorizontal: 20,
    textAlign: "center"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 35,
    marginTop: 16
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  icon: {
    height: 32,
    resizeMode: "contain",
    width: 32
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
