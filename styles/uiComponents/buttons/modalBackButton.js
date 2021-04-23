// @flow

import { StyleSheet } from "react-native";
import { dimensions } from "../../global";

import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: dimensions.height > 570 ? 26 : 15
  }
} );

export default viewStyles;
