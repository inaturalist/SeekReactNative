import { StyleSheet, Platform } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  greenButton: {
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 6,
    flexDirection: "row",
    height: 29,
    marginBottom: 7,
    marginRight: 10,
    paddingHorizontal: 9,
    paddingTop: Platform.OS === "ios" ? 6 : 3
  },
  greenButtonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 28
  },
  greenButtonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0
  }
} );
