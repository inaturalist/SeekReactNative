import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  card: {
    marginBottom: 20,
    marginHorizontal: 25
  },
  commonNameText: {
    color: colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.book,
    fontSize: 21
  },
  deleteButton: {
    justifyContent: "center",
    marginLeft: width - 327 - 25,
    marginRight: 25,
    width: 72
  },
  image: {
    borderRadius: 80 / 2,
    height: 80,
    marginRight: 20,
    width: 80
  },
  scientificNameText: {
    color: colors.black,
    flexDirection: "row",
    flexWrap: "wrap",
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 5
  },
  speciesNameContainer: {
    maxWidth: 223
  },
  touchableArea: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: 327
  }
} );
