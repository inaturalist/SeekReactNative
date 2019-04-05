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
  textContainer: {
    position: "absolute",
    top: height / 2 - 100
  },
  errorText: {
    textAlign: "center",
    marginHorizontal: 41,
    fontSize: 19,
    lineHeight: 24,
    fontFamily: fonts.medium,
    color: colors.white
  }
} );
