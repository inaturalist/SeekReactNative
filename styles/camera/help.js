import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts } from "../global";

const { width, height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  bullets: {
    fontSize: 26,
    lineHeight: 21,
    marginRight: 20,
    marginTop: 18
  },
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  howText: {
    marginRight: 36,
    width: height > 570 ? 192 : 140
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
  secondHeaderText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    marginTop: 35,
    textAlign: "left"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 11
  },
  textContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 26,
    marginTop: 20
  },
  tipContainer: {
    width: height > 570 ? 260 : 230
  },
  tips: {
    flexDirection: "row",
    flexWrap: "nowrap"
  },
  topImage: {
    height: 180,
    overflow: "hidden",
    resizeMode: "cover",
    width
  }
} );
