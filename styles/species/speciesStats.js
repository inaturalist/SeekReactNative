import { StyleSheet, Platform } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  greenButtonContainer: {
    marginTop: 28,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  greenButton: {
    flexDirection: "row",
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 6,
    height: 29,
    paddingHorizontal: 9,
    paddingTop: Platform.OS === "ios" ? 6 : 3,
    marginRight: 10,
    marginBottom: 7
  },
  greenButtonText: {
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.white,
    letterSpacing: 1.0
  }
} );
