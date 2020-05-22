import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  row
} from "../global";

export default StyleSheet.create( {
  bullet: {
    marginRight: 18
  },
  marginTop: {
    marginTop: 7
  },
  row,
  taxonomyHeader: {
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 21
  },
  taxonomyText: {
    fontFamily: fonts.book,
    maxWidth: 200
  }
} );
