import { StyleSheet } from "react-native";

import { fonts, colors, padding } from "../global";

export default StyleSheet.create( {
  text: {
    width: 292,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    color: colors.black,
    fontFamily: fonts.book
  },
  button: {
    marginTop: 28,
    width: 317,
    height: 52,
    borderRadius: 34,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    paddingTop: padding.iOSPadding,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    color: colors.white
  }
} );
