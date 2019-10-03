import { StyleSheet } from "react-native";
import { colors, fonts, touchable } from "../global";

export default StyleSheet.create( {
  headerMargins: {
    marginBottom: 23,
    marginTop: 45
  },
  image: {
    height: 65,
    resizeMode: "contain",
    width: 81
  },
  number: {
    color: colors.black,
    fontFamily: fonts.light,
    fontSize: 20,
    marginTop: 8
  },
  secondHeaderText: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    letterSpacing: 1.0,
    lineHeight: 24
  },
  stats: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center"
  },
  textContainer: {
    marginLeft: 32
  },
  touchable
} );
