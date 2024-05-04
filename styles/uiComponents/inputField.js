// @flow

import { StyleSheet } from "react-native";
import { colors, dimensions } from "../global";

const textStyles = StyleSheet.create( {
  inputField: {
    backgroundColor: colors.white,
    borderColor: colors.darkGray,
    borderRadius: 40,
    borderWidth: 1,
    color: colors.black,
    height: 37,
    marginHorizontal: dimensions.height > 570 ? 34 : 20,
    paddingHorizontal: 15
  }
} );

export default textStyles;
