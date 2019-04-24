import { StyleSheet } from "react-native";
import { colors, fonts } from "./global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  textContainer: {
    marginTop: 27,
    alignItems: "center",
    marginHorizontal: 34
  },
  row: {
    marginBottom: 27,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  block: {
    marginBottom: 34
  },
  boldText: {
    marginBottom: 5,
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  },
  greenText: {
    fontSize: 18,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.0
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  image: {
    width: 300,
    height: 51,
    resizeMode: "contain"
  }
} );
