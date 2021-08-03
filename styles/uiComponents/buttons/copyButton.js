// @flow

import { StyleSheet } from "react-native";

import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  pressableArea: {
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 28
  },
  copiedAnimation: {
    zIndex: 1,
    alignSelf: "center",
    position: "absolute",
    top: -35
  }
} );

export default viewStyles;
