// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  background: {
    backgroundColor: colors.white
  },
  challengeBackground: {
    flex: 1
  },
  descriptionText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  iNatLogo: {
    height: 35,
    top: 32,
    width: 191
  },
  iNatMargin: {
    marginTop: 99
  },
  logo: {
    alignSelf: "center",
    height: 58,
    position: "absolute",
    resizeMode: "contain",
    top: 20,
    width: 116
  },
  margin: {
    marginTop: 99
  },
  marginLarge: {
    marginTop: 37
  },
  marginMedium: {
    marginTop: 28
  },
  marginSmall: {
    marginTop: 21
  },
  opContainer: {
    alignSelf: "center",
    marginBottom: 29,
    marginTop: 23
  },
  photographerText: {
    fontSize: 14,
    textAlign: "center"
  },
  viewText: {
    color: colors.seekTeal,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    textDecorationLine: "underline"
  },
  textContainer: {
    paddingHorizontal: 35
  },
  whiteContainer: {
    backgroundColor: colors.white
  }
} );
