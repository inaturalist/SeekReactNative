import { StyleSheet } from "react-native";
import { colors, fonts, touchable } from "../global";

export default StyleSheet.create( {
  stats: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 23
  },
  headerText: {
    marginTop: 45,
    marginBottom: 11,
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  image: {
    height: 65,
    width: 81,
    resizeMode: "contain"
  },
  textContainer: {
    marginLeft: 32
  },
  secondHeaderText: {
    fontSize: 19,
    fontFamily: fonts.medium,
    color: colors.black,
    lineHeight: 24,
    letterSpacing: 1.0
  },
  number: {
    marginTop: 8,
    fontSize: 20,
    fontFamily: fonts.light,
    color: colors.black
  },
  touchable
} );
