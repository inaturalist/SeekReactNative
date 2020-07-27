import { StyleSheet } from "react-native";

import {
  fonts,
  colors,
  row,
  center
} from "../global";

export default StyleSheet.create( {
  center,
  marginLeft: {
    marginLeft: 14
  },
  row,
  textLink: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 17,
    marginTop: 26,
    textDecorationLine: "underline"
  },
  signupTextLink: {
    color: colors.seekForestGreen,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 23,
    textAlign: "center"
  }
} );
