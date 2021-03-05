// @flow

import { StyleSheet } from "react-native";
import { fonts, dimensions } from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    marginBottom: dimensions.height > 570 ? 60 : 26,
    marginHorizontal: 32
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  greenButton: {
    justifyContent: "flex-end"
  },
  text: {
    textAlign: "center",
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 32
  }
} );
