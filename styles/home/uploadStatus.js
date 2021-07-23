// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, row } from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
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
  closeButton: {
    right: 0,
    top: 0,
    position: "absolute",
    paddingHorizontal: 15,
    paddingVertical: 19,
    zIndex: 1
  },
  closeIcon: {
    height: 13,
    width: 13
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.speciesNearbyGreen
  },
  containerPadding: {
    paddingHorizontal: 20,
    paddingVertical: 24
  },
  fullWidth: {
    width: "100%"
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
  greenButton: {
    marginTop: 20
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  text: {
    paddingTop: 5,
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    paddingRight: 15,
    maxWidth: 236
  },
  errorText: {
    marginTop: 20,
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 24
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  checkmark: {
    width: 15.8,
    height: 11,
    tintColor: colors.white
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
