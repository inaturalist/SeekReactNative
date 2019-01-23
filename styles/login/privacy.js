import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  textContainer: {
    marginHorizontal: 29,
    marginTop: 29,
    marginBottom: 29
  },
  text: {
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 23,
    color: colors.black
  }
} );
