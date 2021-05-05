// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  row,
  dimensions
} from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const { height, width } = dimensions;

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  card: {
    paddingVertical: 12
  },
  row,
  startButton: {
    alignItems: "center",
    width: 59,
    marginHorizontal: height > 570 ? 25 : 10
  },
  textContainer: {
    width: height > 570 ? width - ( 110 * 2 ) : 170
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  messageText: {
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21
  },
  startText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 14,
    lineHeight: 17,
    textAlign: "center"
  },
  titleText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 16,
    letterSpacing: 0.89,
    lineHeight: 20,
    marginBottom: 1
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  challengeBadgeIcon: {
    height: 60,
    marginHorizontal: height > 570 ? 25 : 10,
    resizeMode: "contain",
    width: 60
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
