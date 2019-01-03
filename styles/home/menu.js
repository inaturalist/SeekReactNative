import { StyleSheet, Dimensions } from "react-native";

import { colors, fonts } from "../global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.darkGray
  },
  column: {
    flex: 1,
    backgroundColor: colors.teal,
    width: width - 120,
    flexDirection: "column"
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 0.5,
    color: colors.white
  }
} );
