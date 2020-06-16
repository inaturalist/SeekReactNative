import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center,
  row,
  dimensions
} from "../global";

export default StyleSheet.create( {
  background: {
    backgroundColor: colors.white
  },
  center,
  errorContainer: {
    backgroundColor: colors.speciesError,
    marginTop: 18,
    paddingHorizontal: 28,
    paddingVertical: 28
  },
  errorText: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 25,
    maxWidth: dimensions.width - ( 28 * 2 ) - 25 - 47,
    textAlign: "center"
  },
  row,
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginHorizontal: 28,
    marginTop: 20,
    textAlign: "center"
  }
} );
