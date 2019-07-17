import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts } from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.black
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  errorText: {
    textAlign: "center",
    top: height / 2 - 150,
    marginHorizontal: 41,
    fontSize: 19,
    lineHeight: 24,
    fontFamily: fonts.medium,
    color: colors.white
  }
} );
