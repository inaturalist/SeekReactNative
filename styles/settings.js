import { StyleSheet } from "react-native";
import {
  colors,
  row,
  fonts,
  dimensions
} from "./global";

export default StyleSheet.create( {
  background: {
    backgroundColor: colors.white,
    flex: 1
  },
  margin: {
    marginTop: 30
  },
  marginHorizontal: {
    justifyContent: "space-between",
    marginHorizontal: 34
  },
  row,
  secondHeaderText: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 22,
    lineHeight: 30,
    textAlign: "center"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    maxWidth: dimensions.width / 2 + 40
  }
} );
