import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  card: {
    marginHorizontal: 25,
    marginBottom: 20
  },
  touchableArea: {
    width: 327,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center"
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    marginRight: 20
  },
  speciesNameContainer: {
    maxWidth: 223
  },
  commonNameText: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 21,
    color: colors.black,
    fontFamily: fonts.book
  },
  scientificNameText: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    fontFamily: fonts.bookItalic,
    color: colors.black,
    fontSize: 16,
    lineHeight: 21
  },
  deleteButton: {
    width: 72,
    justifyContent: "center",
    marginRight: 25,
    marginLeft: 28
  }
} );
