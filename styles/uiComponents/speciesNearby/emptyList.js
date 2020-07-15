import { StyleSheet } from "react-native";
import { colors, fonts } from "../../global";

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
    justifyContent: "center",
    marginHorizontal: 26
  }
} );
