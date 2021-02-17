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
    flex: 1,
    paddingTop: 99
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
  logo: {
    alignSelf: "center",
    height: 58,
    position: "absolute",
    resizeMode: "contain",
    top: 20,
    width: 116
  },
  natGeoLogo: {
    width: 142,
    height: 41
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
    marginTop: 23
  },
  photographerText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 29
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
