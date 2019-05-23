import { StyleSheet } from "react-native";
import { fonts, colors } from "../global";

export default StyleSheet.create( {
  text: {
    fontFamily: fonts.semibold,
    color: colors.seekiNatGreen,
    fontSize: 17
  },
  errorMargin: {
    marginTop: 28,
    marginBottom: 18,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    width: 240,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  image: {
    marginRight: 15
  }
} );
