import { StyleSheet } from "react-native";

import { colors, fonts } from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.teal
  },
  column: {
    flexDirection: "column"
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "space-around"
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 0.5,
    color: colors.white
  }
} );
