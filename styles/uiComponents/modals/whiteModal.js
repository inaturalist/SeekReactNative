// @flow

import { StyleSheet } from "react-native";
import { colors, dimensions } from "../../global";

export default StyleSheet.create( {
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
