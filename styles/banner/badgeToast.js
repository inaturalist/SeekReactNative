import { StyleSheet, Platform } from "react-native";
import { fonts, colors } from "../global";

export default StyleSheet.create( {
  animatedStyle: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    justifyContent: "center",
    backgroundColor: colors.white,
    height: 112
  },
  container: {
    height: 112,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    width: 215
  },
  headerText: {
    paddingTop: Platform.OS === "ios" ? 10 : null,
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  description: {
    marginTop: 8,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    color: colors.black
  },
  view: {
    marginTop: 8,
    fontFamily: fonts.light,
    fontSize: 14,
    lineHeight: 21,
    color: colors.black
  },
  image: {
    width: 59,
    height: 66
  }
} );
