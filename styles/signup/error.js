import { StyleSheet } from "react-native";
import { fonts, colors } from "../global";

export default StyleSheet.create( {
  errorMargin: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    marginBottom: 18,
    marginTop: 28
  },
  image: {
    marginRight: 15
  },
  text: {
    color: colors.seekiNatGreen,
    fontFamily: fonts.semibold,
    fontSize: 17
  },
  textContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 240
  }
} );
