// @flow

import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  colors,
  fonts,
  padding,
  center
} from "./global";

const { width, height } = Dimensions.get( "window" );

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  activeDot: {
    backgroundColor: colors.white,
    borderRadius: 10 / 2,
    height: 10,
    width: 10
  },
  button: {
    backgroundColor: colors.seekTeal,
    borderRadius: 34,
    height: 50,
    justifyContent: "center",
    paddingTop: Platform.OS === "ios" ? padding.iOSPadding : null,
    width: 293
  },
  buttonContainer: {
    marginBottom: 51
  },
  buttonHeight: {
    padding: 15
  },
  center,
  container: {
    flex: 1
  },
  contentContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    width
  },
  dot: {
    backgroundColor: colors.darkGray,
    borderRadius: 6 / 2,
    height: 6,
    marginBottom: 3,
    marginHorizontal: 16,
    marginTop: 3,
    width: 6
  },
  image: {
    alignItems: "center"
  },
  margin: {
    marginTop: 29
  },
  pagination: {
    flexDirection: "row",
    marginBottom: height > 570 ? 37 : 27,
    marginTop: height > 570 ? 57 : 27
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  skipText: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    textAlign: "center",
    textDecorationLine: "underline"
  },
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: height > 570 ? 19 : 16,
    lineHeight: 24,
    maxWidth: 292,
    textAlign: "center"
  },
  continue: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    textAlign: "center"
  }
} );

export {
  textStyles,
  viewStyles
};
