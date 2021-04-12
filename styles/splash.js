// @flow

import { StyleSheet } from "react-native";
import { colors } from "./global";

import type { ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const styles: { [string]: ImageStyleProp } = StyleSheet.create( {
  backgroundImage: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  joint: {
    bottom: 38,
    height: 46,
    position: "absolute",
    resizeMode: "contain",
    tintColor: colors.white,
    width: 270
  },
  logo: {
    height: 112,
    resizeMode: "contain",
    width: 303
  }
} );

export default styles;
