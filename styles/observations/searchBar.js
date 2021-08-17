// @flow

import { StyleSheet } from "react-native";
import { row, colors, fonts } from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  row,
  margins: {
    marginHorizontal: 24,
    marginTop: 21,
    marginBottom: 24
  },
  top: {
    zIndex: 1,
    position: "absolute",
    right: 0,
    padding: 39
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  inputField: {
    backgroundColor: colors.white,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.searchGray,
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 15,
    height: 37,
    width: "88%",
    marginLeft: 12,
    paddingLeft: 15
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  search: {
    height: 22,
    width: 21,
    resizeMode: "contain"
  },
  clear: {
    height: 13,
    width: 13,
    resizeMode: "contain"
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
