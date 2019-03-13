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
    marginLeft: 22,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerText: {
    fontSize: 18,
    lineHeight: 24,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.0
  },
  description: {
    marginTop: 1,
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
    width: 75,
    height: 75,
    resizeMode: "contain",
    marginRight: 17
  }
} );
