// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  marginMedium: {
    marginTop: 26
  },
  marginSmall: {
    marginTop: 16
  },
  speciesText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 30,
    lineHeight: 35,
    marginBottom: 8,
    textAlign: "center"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 23,
    maxWidth: 244,
    textAlign: "center"
  }
} );
