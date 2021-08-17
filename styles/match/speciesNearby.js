// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center
} from "../global";


import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center,
  speciesNearbyContainer: {
    backgroundColor: colors.seekTeal,
    height: 231
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  headerText: {
    alignSelf: "center",
    color: colors.seekTeal,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginBottom: 20,
    marginTop: 4
  }
} );

export {
  textStyles,
  viewStyles
};
