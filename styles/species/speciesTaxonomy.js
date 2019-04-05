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
  headerText: {
    marginTop: 45,
    marginBottom: 11,
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.seekForestGreen,
    letterSpacing: 1.12
  },
  taxonomyText: {
    maxWidth: 200,
    fontSize: 16,
    fontFamily: fonts.book,
    color: colors.black,
    lineHeight: 21
  },
  taxonomyRow: {
    marginTop: 7,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  bullets: {
    marginRight: 16
  },
  italicText: {
    fontFamily: fonts.boldItalic
  }
} );
