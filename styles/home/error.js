// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center,
  row,
  padding,
  dimensions
} from "../global";



const viewStyles = StyleSheet.create( {
  background: {
    height: 223
  },
  center,
  greenButton: {
    paddingTop: 25
  },
  row
} );

const textStyles = StyleSheet.create( {
  buttonText: {
    // modalBanner with 16
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16,
    letterSpacing: 1.12,
    textAlign: "center"
  },
  text: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 12,
    maxWidth: 245,
    textAlign: "center"
  },
  whiteText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: padding.iOSButtonPadding,
    textAlign: "center",
    maxWidth: dimensions.width - 40
  }
} );

export {
  viewStyles,
  textStyles
};
