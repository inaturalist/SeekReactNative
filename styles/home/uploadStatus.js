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
  center: {
    alignItems: "center"
  },
  checkmark: {
    width: 15.8,
    height: 11,
    tintColor: colors.white
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.speciesNearbyGreen,
    paddingHorizontal: 20,
    paddingVertical: 24
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  iNatIcon: {
    height: 69,
    width: 69,
    marginRight: 15
  },
  progressBar: {
    marginTop: 21,
    height: 6,
    marginHorizontal: 7,
    backgroundColor: "white",
    borderRadius: 40
  },
  row,
  text: {
    paddingTop: 5,
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    paddingRight: 15
  }
} );
