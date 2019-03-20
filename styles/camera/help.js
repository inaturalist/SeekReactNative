import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  secondHeaderText: {
    textAlign: "left",
    marginTop: 35,
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  textContainer: {
    marginTop: 20,
    backgroundColor: colors.white,
    marginHorizontal: 26
  },
  text: {
    marginTop: 11,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  },
  bullets: {
    marginTop: 18,
    marginRight: 20,
    fontSize: 26,
    lineHeight: 21
  },
  tipContainer: {
    width: 260
  },
  tips: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  howText: {
    width: 192,
    marginRight: 36
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
