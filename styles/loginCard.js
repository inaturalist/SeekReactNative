import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "./global";

export default StyleSheet.create( {
  container: {
    marginHorizontal: 23,
    marginTop: 32
  },
  italicText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21,
    marginHorizontal: 15,
    textAlign: "center"
  },
  loginText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginBottom: 28,
    marginHorizontal: 15,
    maxWidth: 334,
    textAlign: "center"
  },
  margin: {
    marginTop: 30
  }
} );
