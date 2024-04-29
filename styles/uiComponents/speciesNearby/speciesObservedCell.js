// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  cellImage: {
    borderRadius: 108 / 2,
    height: 108,
    width: 108
  },
  cellTitle: {
    flexDirection: "row",
    height: 92,
    justifyContent: "center",
    paddingTop: 13,
    width: 108
  },
  checkbox: {
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: 1,
    height: 24,
    width: 24
  },
  speciesImageCheckbox: {
    bottom: 91
  },
  gridCell: {
    marginRight: 23,
    width: 108,
    height: 205
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  cellTitleText: {
    textAlign: "center"
  },
  scientificName: {
    fontFamily: fonts.bookItalic
  },
  speciesNameText: {
    paddingTop: 13,
    textAlign: "center"
  }
} );

export {
  textStyles,
  viewStyles
};
