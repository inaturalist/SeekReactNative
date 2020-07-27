import { StyleSheet } from "react-native";
import { colors, fonts, padding } from "../global";

export default StyleSheet.create( {
  greenButton: {
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 6,
    flexDirection: "row",
    marginBottom: 6,
    marginRight: 10,
    paddingBottom: 4,
    paddingTop: 4
  },
  greenButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 28,
    marginTop: 28
  },
  greenButtonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingHorizontal: 9,
    paddingTop: padding.iOSPaddingFontSize18
  }
} );
