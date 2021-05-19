// @flow

import { StyleSheet } from "react-native";
import {
  center,
  colors,
  fonts
} from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center,
  noChallengeContainer: {
    paddingBottom: 49,
    paddingTop: 24
  }
} );


const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  lightText: {
    color: colors.errorGray,
    fontFamily: fonts.light,
    fontSize: 16,
    lineHeight: 18,
    marginTop: 10,
    textAlign: "center",
    width: 229
  },
  noChallengeText: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    textAlign: "center",
    width: 229
  }
} );

export {
  viewStyles,
  textStyles
};
