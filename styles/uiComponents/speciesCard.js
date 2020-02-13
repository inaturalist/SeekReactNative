import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  row
} from "../global";

export default StyleSheet.create( {
  commonNameText: {
    color: colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.book,
    fontSize: 21,
    lineHeight: 21
  },
  image: {
    borderRadius: 80 / 2,
    height: 80,
    marginRight: 24,
    width: 80
  },
  notTouchable: {
    width: 276
  },
  row,
  scientificNameText: {
    color: colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    marginTop: 12
  },
  speciesNameContainer: {
    maxWidth: 220
  },
  touchableArea: {
    width: 327
  }
} );
