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
  header: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
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
  }
} );
