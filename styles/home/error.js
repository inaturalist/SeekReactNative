import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  textContainer: {
    marginLeft: 42,
    marginRight: 22
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-around"
  },
  text: {
    textAlign: "center",
    color: colors.white,
    maxWidth: 245,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: 12
  },
  greenButton: {
    marginTop: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 24,
    width: 284,
    paddingHorizontal: 12,
    height: 34
  },
  buttonText: {
    fontFamily: fonts.semibold,
    letterSpacing: 1.12,
    fontSize: 16,
    color: colors.white
  }
} );
