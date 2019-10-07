import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  center
} from "../global";

export default StyleSheet.create( {
  background: {
    alignItems: "center",
    height: 223,
    justifyContent: "center"
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
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  },
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
