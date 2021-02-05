// @flow

import { StyleSheet, Dimensions } from "react-native";

import {
  colors,
  fonts,
  padding
} from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1,
    justifyContent: "center"
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.dividerWhite
  },
  menuItem: {
    height: height / 11,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap"
  },
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
    marginBottom: height / 11 / 2,
    resizeMode: "contain",
    width: 223
  },
  text: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    maxWidth: 226,
    paddingTop: padding.iOSButtonPadding
  }
} );
