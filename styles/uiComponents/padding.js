// @flow

import { StyleSheet, Platform } from "react-native";

import { colors } from "../global";

import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  padding: {
    backgroundColor: colors.white,
    paddingBottom: Platform.OS === "android" ? 17 : 60
  }
} );

export default viewStyles;
