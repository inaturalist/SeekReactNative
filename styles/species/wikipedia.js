import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

export default StyleSheet.create( {
  back: {
    padding: 18,
    position: "absolute",
    right: 23 - 18,
    top: 0
  },
  bottom: {
    height: 60
  },
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    height: 55
  },
  text: {
    alignSelf: "center",
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    top: 19
  }
} );
