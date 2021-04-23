// @flow

import { StyleSheet } from "react-native";
import { colors, dimensions } from "../../global";

import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  innerContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.white,
    borderRadius: 40,
    maxHeight: 558,
    maxWidth: 366,
    width: dimensions.width > 350
      ? dimensions.width - dimensions.width * 0.1
      : dimensions.width
    // this creates margins on smaller screen sizes
  }
} );

export default viewStyles;
