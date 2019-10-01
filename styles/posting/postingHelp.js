import { StyleSheet, Platform } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  boldText: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 21
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 17,
    justifyContent: "center",
    letterSpacing: 1,
    marginLeft: 21,
    paddingTop: Platform.OS === "ios" ? 6 : 0
  },
  icon: {
    height: 32,
    resizeMode: "contain",
    width: 32
  },
  italicText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21,
    marginHorizontal: 20,
    textAlign: "center"
  },
  paragraph: {
    marginBottom: 16
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  safeViewTop: {
    backgroundColor: colors.seekForestGreen,
    flex: 0
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 35,
    marginTop: 16
  },
  textContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 27,
    marginTop: 30
  }
} );
