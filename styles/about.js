// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, row } from "./global";

export default StyleSheet.create( {
  block: {
    marginBottom: 34
  },
  boldText: {
    fontFamily: fonts.semibold,
    marginBottom: 5
  },
  debug: {
    paddingBottom: 17,
    paddingHorizontal: 20,
    paddingTop: 27
  },
  greenText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0
  },
  image: {
    height: 54,
    resizeMode: "contain",
    width: 307
  },
  margin: {
    marginBottom: 27
  },
  marginLarge: {
    marginTop: 38
  },
  marginLeft: {
    marginLeft: 20
  },
  marginSmall: {
    marginTop: 22
  },
  marginSmallest: {
    marginTop: 17
  },
  row,
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  },
  textContainer: {
    alignItems: "center",
    marginHorizontal: 26,
    marginTop: 31
  },
  wwfop: {
    height: 80,
    resizeMode: "contain",
    width: 240
  }
} );
