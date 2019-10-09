import { StyleSheet } from "react-native";
import { fonts, colors } from "../global";

export default StyleSheet.create( {
  center: {
    textAlign: "center"
  },
  greenHeaderText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  smallerText: {
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24
  }
} );
