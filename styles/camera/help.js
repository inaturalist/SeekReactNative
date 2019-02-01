import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    marginHorizontal: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  secondHeaderText: {
    textAlign: "left",
    marginTop: 26,
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  headerText: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    lineHeight: 24,
    letterSpacing: 1.0
  },
  textContainer: {
    marginTop: 21,
    backgroundColor: colors.white,
    marginHorizontal: 36
  },
  text: {
    marginTop: 16,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  },
  bullets: {
    marginTop: 16,
    fontSize: 20,
    lineHeight: 21
  },
  tips: {
    marginLeft: 10,
    flexDirection: "row",
    flexWrap: "nowrap"
  }
} );
