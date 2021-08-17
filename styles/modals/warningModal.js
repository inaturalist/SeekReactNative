// @flow

import {
  StyleSheet,
  Platform
} from "react-native";
import {
  colors,
  fonts,
  row,
  dimensions
} from "../global";

import type { ViewStyleProp, ImageStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  button: {
    paddingBottom: dimensions.height > 570 ? 24 : 17,
    paddingTop: dimensions.height > 570 ? 28 : 26
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 67,
    justifyContent: "center",
    width: "100%"
  },
  margin: {
    marginTop: 28
  },
  marginSmall: {
    marginTop: dimensions.height > 570 ? 18 : 26
  },
  marginTop: {
    marginTop: dimensions.height > 570 ? 26 : 24
  },
  row
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "ios" ? 9 : 0,
    textAlign: "center"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    maxWidth: 206
  },
  wideText: {
    maxWidth: 270,
    textAlign: "center"
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  image: {
    height: 40,
    marginRight: 22,
    resizeMode: "contain",
    width: 40
  }
} );

export {
  viewStyles,
  textStyles,
  imageStyles
};
