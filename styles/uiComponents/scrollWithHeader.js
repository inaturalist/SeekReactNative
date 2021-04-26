// @flow

import { StyleSheet, Platform } from "react-native";
import { colors } from "../global";

import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  container: {
    backgroundColor: Platform.OS === "android" ? colors.white : colors.seekForestGreen,
    flex: 1
  },
  containerWhite: {
    backgroundColor: colors.white
  },
  darkGreen: {
    backgroundColor: colors.speciesNearbyGreen
  },
  green: {
    backgroundColor: colors.seekForestGreen
  },
  black: {
    backgroundColor: colors.black
  },
  loadingWheel: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  }
} );

export default viewStyles;
