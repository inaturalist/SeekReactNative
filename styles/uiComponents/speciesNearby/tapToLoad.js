// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center
} from "../../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center,
  speciesNearbyContainer: {
    backgroundColor: colors.seekTeal,
    paddingVertical: 15
  },
  challengeContainer: {
    backgroundColor: colors.white
  }
} );


const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 245,
    textAlign: "center"
  },
  challengeText: {
    color: colors.black
  }
} );

export {
  viewStyles,
  textStyles
};
