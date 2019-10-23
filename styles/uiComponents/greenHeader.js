import { StyleSheet, Platform } from "react-native";
import { colors, fonts, touchable } from "../global";

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.seekForestGreen,
    height: 55
  },
  help: {
    paddingTop: Platform.OS === "android" ? 13 : 15,
    position: "absolute",
    right: 21
  },
  text: {
    alignSelf: "center",
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "android" ? 18 : 20,
    position: "absolute"
  },
  touchable
} );
