import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center"
  },
  safeViewTop: {
    flex: 0
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  header: {
    textAlign: "center",
    fontSize: 19,
    lineHeight: 25,
    letterSpacing: 1.12,
    fontFamily: fonts.semibold,
    color: colors.seekiNatGreen
  }
} );
