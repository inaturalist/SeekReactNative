import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  row
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
    marginBottom: 5,
    marginLeft: 10
  },
  margin: {
    marginTop: 27
  },
  marginHorizontal: {
    justifyContent: "space-between",
    marginHorizontal: 28
  },
  marginMedium: {
    marginTop: 22
  },
  marginSmall: {
    marginTop: 19
  },
  marginSmallest: {
    marginTop: 15
  },
  radioMargin: {
    marginBottom: 11,
    marginLeft: 38
  },
  row,
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  }
} );
