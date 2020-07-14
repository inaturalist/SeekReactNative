import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.white,
    flex: 1
  },
  sectionText: {
    marginTop: 25
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 23
  },
  textContainer: {
    marginBottom: 27,
    marginHorizontal: 29,
    marginTop: 27
  }
} );
