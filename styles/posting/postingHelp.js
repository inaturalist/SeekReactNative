import { StyleSheet, Platform } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  icon: {
    height: 32,
    width: 32,
    resizeMode: "contain"
  },
  headerText: {
    paddingTop: Platform.OS === "ios" ? 6 : 0,
    justifyContent: "center",
    marginLeft: 21,
    fontSize: 17,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1
  },
  textContainer: {
    marginTop: 30,
    backgroundColor: colors.white,
    marginHorizontal: 27
  },
  paragraph: {
    marginBottom: 16
  },
  text: {
    marginTop: 16,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black,
    marginBottom: 35
  },
  boldText: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  },
  italicText: {
    textAlign: "center",
    marginHorizontal: 20,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  }
} );
