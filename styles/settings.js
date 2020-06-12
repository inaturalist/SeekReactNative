import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  row,
  center,
  padding
} from "./global";

export default StyleSheet.create( {
  background: {
    backgroundColor: colors.white,
    flex: 1
  },
  center,
  checkBox: {
    paddingRight: 10.3
  },
  checkboxRow: {
    marginTop: 17
  },
  greenButton: {
    backgroundColor: colors.seekForestGreen,
    borderRadius: 6,
    paddingBottom: 11,
    paddingHorizontal: 18,
    paddingTop: Platform.OS === "ios" ? 18 : 12
  },
  header: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12
  },
  languageText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 20,
    letterSpacing: 1.11
  },
  leftMargin: {
    marginBottom: 5,
    marginLeft: 10
  },
  margin: {
    marginTop: 35
  },
  marginHorizontal: {
    justifyContent: "space-between",
    marginHorizontal: 28
  },
  marginMedium: {
    marginTop: 22
  },
  marginSmall: {
    marginTop: 15
  },
  marginTop: {
    marginTop: 24
  },
  padding: {
    paddingTop: padding.iOSPaddingSmall
  },
  radioMargin: {
    marginBottom: 11,
    marginLeft: 10
  },
  row,
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  }
} );
