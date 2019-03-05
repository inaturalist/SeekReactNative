import { StyleSheet } from "react-native";
import { fonts, colors, padding } from "../global";

export default StyleSheet.create( {
  topContainer: {
    zIndex: 1
  },
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
    zIndex: 1
  },
  row: {
    height: 112,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    width: 215,
    marginRight: 10
  },
  headerText: {
    paddingTop: padding.iOSPadding,
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
    height: 66,
    resizeMode: "contain"
  }
} );
