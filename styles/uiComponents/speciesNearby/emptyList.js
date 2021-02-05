// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, dimensions } from "../../global";

export default StyleSheet.create( {
  cellTitleText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 322
  },
  noTaxon: {
    width: dimensions.width,
    alignItems: "center",
    justifyContent: "center"
  }
} );
