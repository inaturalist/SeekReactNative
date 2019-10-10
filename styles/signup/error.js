import { StyleSheet } from "react-native";
import { fonts, colors, dimensions } from "../global";

export default StyleSheet.create( {
  errorMargin: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    marginBottom: dimensions.height > 570 ? 27 : 18,
    marginHorizontal: dimensions.height > 570 ? 34 : 20,
    marginTop: dimensions.height > 570 ? 30 : 21
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
    flexWrap: "wrap"
  }
} );
