// @flow

import { StyleSheet } from "react-native";
import { colors } from "../global";

import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  bottomSpacer: {
    backgroundColor: colors.white,
    bottom: -1000,
    height: 1050,
    left: 0,
    position: "absolute",
    right: 0
  },
  iosSpacer: {
    backgroundColor: colors.seekForestGreen,
    height: 1000,
    left: 0,
    position: "absolute",
    right: 0,
    top: -1000
  }
} );

export default viewStyles;
