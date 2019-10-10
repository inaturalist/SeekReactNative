import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  container: {
    flexGrow: 1,
    justifyContent: "center",
    marginHorizontal: 28
  },
  headerText: {
    alignSelf: "center",
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    maxWidth: 279,
    textAlign: "center"
  },
  margin: {
    marginTop: 32
  },
  text: {
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 24,
    textAlign: "center"
  }
} );
