import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  touchable
} from "../global";

export default StyleSheet.create( {
  bottomPadding: {
    backgroundColor: colors.seekForestGreen,
    height: Platform.OS === "android" ? 17 : 60
  },
  checkmark: {
    marginRight: 10
  },
  commonNameText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 30,
    letterSpacing: 0.3,
    lineHeight: 31,
    marginTop: 23
  },
  greenBanner: {
    backgroundColor: colors.seekForestGreen,
    height: 40,
    justifyContent: "center"
  },
  headerMargins: {
    marginBottom: 11,
    marginTop: 45
  },
  humanText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 45,
    textAlign: "center"
  },
  iconicTaxaText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    marginLeft: 28,
    paddingTop: Platform.OS === "ios" ? 7 : 0
  },
  loading: {
    alignItems: "center",
    justifyContent: "center"
  },
  marginSmall: {
    marginTop: 21
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginTop: 28
  },
  scientificNameText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 19,
    lineHeight: 21,
    marginTop: 10
  },
  secondTextContainer: {
    marginHorizontal: 28
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  textContainer: {
    marginHorizontal: 28
  },
  touchable
} );
