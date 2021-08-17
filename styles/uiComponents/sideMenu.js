// @flow

import { StyleSheet } from "react-native";

import {
  colors,
  fonts,
  padding
} from "../global";

import type { ViewStyleProp, ImageStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

// const { height } = Dimensions.get( "window" );

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1,
    flexGrow: 1,
    justifyContent: "center"
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.dividerWhite
  },
  menuItem: {
    // height: height / 11,
    paddingVertical: 21,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap"
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  icon: {
    height: 25,
    marginHorizontal: 25,
    resizeMode: "contain",
    tintColor: colors.menuItems,
    width: 27
  },
  seekLogo: {
    alignSelf: "center",
    height: 79,
    marginVertical: 62 - 21,
    // marginBottom: height / 11 / 2,
    resizeMode: "contain",
    width: 223
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    maxWidth: 226,
    paddingTop: padding.iOSButtonPadding
  }
} );

export {
  textStyles,
  imageStyles,
  viewStyles
};
