import { StyleSheet } from "react-native";
import { row, colors, fonts } from "../global";

export default StyleSheet.create( {
  row,
  margins: {
    marginHorizontal: 24,
    marginTop: 21,
    marginBottom: 24
  },
  search: {
    height: 22,
    width: 21,
    resizeMode: "contain"
  },
  inputField: {
    backgroundColor: colors.white,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.searchGray,
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 15,
    height: 37,
    width: "88%",
    marginLeft: 12,
    paddingLeft: 15
  },
  top: {
    zIndex: 1,
    position: "absolute",
    right: 0,
    padding: 39
  },
  clear: {
    height: 13,
    width: 13,
    resizeMode: "contain"
  }
} );
