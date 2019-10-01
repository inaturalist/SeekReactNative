import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  touchable
} from "../global";

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  greenBanner: {
    backgroundColor: colors.seekForestGreen,
    justifyContent: "center",
    height: 40
  },
  iconicTaxaText: {
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    marginLeft: 28,
    color: colors.white,
    fontSize: 19,
    fontFamily: fonts.semibold,
    letterSpacing: 1.12
  },
  textContainer: {
    marginHorizontal: 28
  },
  secondTextContainer: {
    marginHorizontal: 28
  },
  commonNameText: {
    marginTop: 23,
    fontSize: 30,
    lineHeight: 31,
    letterSpacing: 0.3,
    color: colors.black,
    fontFamily: fonts.book
  },
  scientificNameText: {
    marginTop: 10,
    fontFamily: fonts.bookItalic,
    color: colors.black,
    fontSize: 19,
    lineHeight: 21
  },
  headerText: {
    marginTop: 45,
    marginBottom: 11,
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  row: {
    marginTop: 28,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  checkmark: {
    marginRight: 10
  },
  loading: {
    justifyContent: "center",
    alignItems: "center"
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: colors.transparent
  },
  bottomPadding: {
    height: Platform.OS === "android" ? 17 : 60,
    backgroundColor: colors.seekForestGreen
  },
  touchable,
  humanText: {
    textAlign: "center",
    marginTop: 45,
    color: colors.black,
    fontSize: 16,
    lineHeight: 21,
    fontFamily: fonts.bookItalic
  }
} );
