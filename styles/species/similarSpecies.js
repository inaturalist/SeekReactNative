// @flow

import { StyleSheet, Platform } from "react-native";
import { colors } from "../global";

import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  bottomPadding: {
    backgroundColor: colors.seekForestGreen,
    height: Platform.OS === "android" ? 17 : 60
  },
  empty: {
    backgroundColor: colors.white
  },
  similarSpeciesContainer: {
    backgroundColor: colors.seekForestGreen,
    height: 231
  },
  similarSpeciesHeader: {
    marginBottom: 11,
    marginLeft: 28,
    marginTop: 45
  }
} );

export default viewStyles;
