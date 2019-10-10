import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  bullets: {
    marginRight: 16
  },
  headerMargins: {
    marginBottom: 4,
    marginTop: 45
  },
  italicText: {
    fontFamily: fonts.boldItalic
  },
  taxonomyHeader: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 21
  },
  taxonomyRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginTop: 7
  },
  taxonomyText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    maxWidth: 200
  }
} );
