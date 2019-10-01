import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts } from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.black,
    flex: 1
  },
  errorText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    marginHorizontal: 41,
    textAlign: "center",
    top: height / 2 - 150
  },
  safeViewTop: {
    backgroundColor: colors.seekForestGreen,
    flex: 0
  }
} );
