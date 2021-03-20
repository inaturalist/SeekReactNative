// @flow

import { StyleSheet } from "react-native";
import { fonts, colors, dimensions } from "../global";

export default StyleSheet.create( {
  animatedStyle: {
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1
  },
  description: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 1
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    marginTop: 16,
    lineHeight: 24,
    maxWidth: dimensions.width - 59 - ( 24 * 2 )
  },
  image: {
    height: 75,
    width: 75,
    resizeMode: "contain",
    position: "absolute",
    right: 17
  },
  progress: {
    height: 59,
    position: "absolute",
    right: 24,
    width: 59
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 21,
    backgroundColor: colors.white
  },
  topContainer: {
    zIndex: 1
  },
  view: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
    marginBottom: 21
  }
} );
