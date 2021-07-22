// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  row
} from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  flagBackButton: {
    marginLeft: 33,
    marginRight: 29
  },
  flagHeader: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 62,
    width: "100%"
  },
  flagTextContainer: {
    justifyContent: "flex-end",
    marginTop: 15
  },
  margin: {
    marginTop: 27
  },
  marginLarge: {
    marginTop: 32
  },
  marginSmall: {
    marginTop: 16
  },
  row
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginRight: 15,
    paddingTop: 9,
    textAlign: "center"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    width: 292
  }
} );

export {
  textStyles,
  viewStyles
};
