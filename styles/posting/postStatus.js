import { StyleSheet } from "react-native";
import {
  fonts,
  center,
  dimensions,
  colors
} from "../global";

export default StyleSheet.create( {
  bottom: {
    marginBottom: dimensions.height > 570 ? 60 : 26,
    marginHorizontal: 23
  },
  center,
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 28
  },
  fail: {
    tintColor: colors.seekTeal
  },
  margin: {
    marginTop: 54
  },
  text: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 32,
    textAlign: "center",
    width: 250
  }
} );
