// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  row,
  dimensions
} from "./global";

const { width } = dimensions;

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  card: {
    height: 112,
    justifyContent: "flex-start",
    marginHorizontal: 22
  },
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1
  },
  containerWhite: {
    backgroundColor: colors.white
  },
  divider: {
    backgroundColor: colors.dividerGray,
    height: 1,
    marginHorizontal: 23
  },
  flex: {
    flex: 1
  },
  flexGrow: {
    flexGrow: 1
  },
  greenDot: {
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 11 / 2,
    height: 11,
    width: 11
  },
  row,
  textContainer: {
    width: width - 161
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  messageText: {
    fontFamily: fonts.book,
    fontSize: 14,
    lineHeight: 21
  },
  titleText: {
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 6
  }
} );


const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  image: {
    height: 72,
    marginRight: 24,
    resizeMode: "contain",
    width: 72
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
