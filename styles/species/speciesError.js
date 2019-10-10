import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";


export default StyleSheet.create( {
  errorContainer: {
    alignItems: "center",
    backgroundColor: "#102b1f",
    height: 109,
    justifyContent: "center",
    marginTop: 15
  },
  errorRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between"
  },
  errorText: {
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 12,
    maxWidth: 245,
    textAlign: "center"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  textContainer: {
    marginHorizontal: 28,
    marginTop: 20
  }
} );
