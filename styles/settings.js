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
  checkBox: {
    paddingBottom: 18,
    paddingLeft: 34,
    paddingRight: 18,
    paddingTop: 18
  },
  margin: {
    marginTop: 30
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
    maxWidth: dimensions.width / 2 + 80
  }
} );
