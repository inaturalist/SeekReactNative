// @flow

import { StyleSheet } from "react-native";
import { fonts, dimensions, colors } from "../global";

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
  uploadImage: {
    marginTop: 41
  },
  text: {
    textAlign: "center",
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginTop: 26,
    maxWidth: 298
  },
  headerText: {
    textAlign: "center",
    color: colors.seekiNatGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    lineHeight: 25,
    maxWidth: 298,
    marginTop: 19
  }
} );
