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
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  textContainer: {
    marginHorizontal: 29,
    marginTop: 27,
    marginBottom: 27
  },
  text: {
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 23,
    color: colors.black
  }
} );
