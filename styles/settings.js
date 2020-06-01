import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "./global";

export default StyleSheet.create( {
  background: {
    backgroundColor: colors.white,
    flex: 1
  },
  divider: {
    backgroundColor: colors.dividerGray,
    height: 1,
    marginHorizontal: 23
  },
  header: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  leftMargin: {
    marginLeft: 10
  },
  linkText: {
    color: colors.seekTeal,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textDecorationLine: "underline"
  },
  margin: {
    marginTop: 27
  },
  marginHorizontal: {
    justifyContent: "space-between",
    marginHorizontal: 28
  },
  marginSmall: {
    marginTop: 19
  },
  radioMargin: {
    marginBottom: 11,
    marginLeft: 38
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
} );
