import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";


export default StyleSheet.create( {
  errorContainer: {
    marginTop: 15,
    height: 109,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#102b1f"
  },
  errorRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between"
  },
  errorText: {
    textAlign: "center",
    color: colors.white,
    maxWidth: 245,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 12
  },
  textContainer: {
    marginTop: 20,
    marginHorizontal: 28
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  }
} );
