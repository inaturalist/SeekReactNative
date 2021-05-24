// @flow

import { StyleSheet } from "react-native";
import { colors } from "../global";

import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  background: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: "center"
  },
  center: {
    marginHorizontal: 23
  }
} );

export default viewStyles;
