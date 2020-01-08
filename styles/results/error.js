import { StyleSheet } from "react-native";
import { colors, fonts, dimensions } from "../global";

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.black,
    flex: 1
  },
  errorText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    marginHorizontal: 41,
    textAlign: "center",
    top: dimensions.height / 2 - 150
  }
} );
