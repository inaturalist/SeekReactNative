// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center,
  dimensions,
  padding
} from "../global";

export default StyleSheet.create( {
  blackBackground: {
    backgroundColor: colors.black,
    height: dimensions.height
  },
  center,
  errorText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    marginHorizontal: 41,
    textAlign: "center"
  },
  galleryHeight: {
    height: dimensions.height - 100
  },
  margin: {
    marginTop: 38
  },
  whiteText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16,
    letterSpacing: 1.0,
    paddingTop: padding.iOSButtonPadding,
    textAlign: "center",
    maxWidth: 323
  }
} );
