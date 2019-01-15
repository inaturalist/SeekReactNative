import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    marginTop: 30,
    marginBottom: 16,
    fontSize: 22,
    color: colors.white,
    fontFamily: fonts.semibold
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
