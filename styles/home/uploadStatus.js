// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, row, dimensions } from "../global";

export default StyleSheet.create( {
  absoluteFill: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderRadius: 40,
    backgroundColor: colors.seekiNatGreen
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.speciesNearbyGreen,
    height: 160,
    paddingLeft: 23
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  iNatIcon: {
    height: 90,
    width: 90,
    marginRight: 10
  },
  progressBar: {
    marginTop: 15,
    height: 6,
    width: dimensions.width - 46,
    backgroundColor: "white",
    borderRadius: 40
  },
  row,
  text: {
    paddingTop: 10,
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 21
  }
} );
