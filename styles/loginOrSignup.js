import { StyleSheet } from "react-native";

import { fonts, colors, padding } from "./global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    width: 304,
    height: 107,
    resizeMode: "contain",
    marginBottom: 64
  },
  whiteButton: {
    marginBottom: 25,
    backgroundColor: colors.white,
    width: 296,
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
    color: colors.seekForestGreen
  },
  textLink: {
    marginTop: 11,
    fontFamily: fonts.book,
    fontSize: 19,
    color: colors.white,
    textDecorationLine: "underline"
  },
  text: {
    marginHorizontal: 30,
    marginTop: 64,
    textAlign: "center",
    fontFamily: fonts.medium,
    fontSize: 17,
    lineHeight: 19,
    color: colors.white
  }
} );
