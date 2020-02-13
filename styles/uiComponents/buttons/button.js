import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts
} from "../../global";

export default StyleSheet.create( {
  button: {
    alignItems: "center",
    backgroundColor: colors.red,
    borderRadius: 40,
    height: 46,
    justifyContent: "center",
    width: 243
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    textAlign: "center"
  },
  extraPadding: {
    paddingHorizontal: 26
  },
  greenText: {
    color: colors.seekForestGreen
  },
  largeButton: {
    height: 79,
    width: 278
  }
} );
