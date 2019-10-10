import { StyleSheet } from "react-native";

import { fonts, colors, padding } from "./global";

export default StyleSheet.create( {
  buttonText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: padding.iOSPadding,
    textAlign: "center",
    width: 245
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  logo: {
    height: 107,
    marginBottom: 64,
    resizeMode: "contain",
    width: 304
  },
  text: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 17,
    lineHeight: 19,
    marginHorizontal: 30,
    marginTop: 64,
    textAlign: "center"
  },
  whiteButton: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 34,
    height: 52,
    justifyContent: "center",
    marginBottom: 25,
    width: 296
  }
} );
