import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  center,
  row
} from "../global";

export default StyleSheet.create( {
  background: {
    height: 223
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16,
    letterSpacing: 1.12,
    textAlign: "center"
  },
  center,
  greenButton: {
    alignItems: "center",
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 24,
    height: 34,
    justifyContent: "center",
    marginTop: 24,
    paddingTop: Platform.OS === "ios" ? 5 : null,
    width: 284
  },
  row,
  text: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 12,
    maxWidth: 245,
    textAlign: "center"
  }
} );
