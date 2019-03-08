import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  taxonomyHeader: {
    fontSize: 16,
    fontFamily: fonts.semibold,
    color: colors.black,
    lineHeight: 21
  },
  taxonomyText: {
    maxWidth: 200,
    fontSize: 16,
    fontFamily: fonts.book,
    color: colors.black,
    lineHeight: 21
  },
  taxonomyRow: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  bullets: {
    marginRight: 16
  }
} );
