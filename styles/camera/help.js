import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts } from "../global";

const { width, height } = Dimensions.get( "window" );

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
  topImage: {
    width,
    height: 180,
    resizeMode: "cover",
    overflow: "hidden"
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
    width: height > 570 ? 260 : 230
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
    width: height > 570 ? 192 : 140,
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
