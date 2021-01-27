// @flow

import { StyleSheet } from "react-native";
import { fonts, colors } from "../global";

export default StyleSheet.create( {
  animatedStyle: {
    backgroundColor: colors.white,
    height: 112,
    justifyContent: "center",
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
    marginTop: 10
  },
  image: {
    height: 75,
    marginRight: 17,
    resizeMode: "contain",
    width: 75
  },
  progress: {
    height: 59,
    marginRight: 24,
    resizeMode: "contain",
    width: 59
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    height: 112,
    justifyContent: "space-between",
    marginLeft: 22
  },
  topContainer: {
    zIndex: 1
  },
  view: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 14,
    marginTop: 8
  }
} );
