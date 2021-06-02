// @flow

import { StyleSheet, Platform, PixelRatio } from "react-native";
import {
  colors,
  fonts,
  row
} from "../../global";

const fontScale = PixelRatio.getFontScale();

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  backButton: {
    marginLeft: 33,
    marginRight: 29
  },
  container: {
    alignSelf: "center",
    backgroundColor: colors.white,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
    width: 337
  },
  grayButton: {
    backgroundColor: colors.grayGradientLight,
    borderRadius: 6,
    paddingHorizontal: 15,
    paddingVertical: 5,
    position: "absolute",
    right: 17.5,
    top: 55
  },
  header: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 167,
    overflow: "visible"
  },
  headerTextContainer: {
    justifyContent: "flex-end",
    marginTop: 15
  },
  imageCell: {
    borderRadius: 129 / 2,
    height: 129,
    width: 129
  },
  images: {
    justifyContent: "center",
    marginHorizontal: 22,
    marginTop: 20
  },
  innerContainer: {
    alignItems: "center"
  },
  marginLarge: {
    marginTop: 55
  },
  marginLeft: {
    marginLeft: 17
  },
  marginMedium: {
    marginTop: 32
  },
  row
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: ( fontScale > 1 ) ? 16 : 18,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    textAlign: "center"
  },
  grayButtonText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 12
  }
} );

export {
  viewStyles,
  textStyles
};
