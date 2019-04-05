import { StyleSheet, Platform } from "react-native";
import { colors, fonts } from "./global";

export default StyleSheet.create( {
  container: {
    height: 55,
    backgroundColor: colors.seekForestGreen
  },
  backButton: {
    top: 18,
    left: 23
  },
  text: {
    top: Platform.OS === "android" ? -4 : null,
    alignSelf: "center",
    fontSize: 18,
    color: colors.white,
    letterSpacing: 1.0,
    fontFamily: fonts.semibold
  },
  touchable: {
    left: 23,
    right: 23,
    top: 23,
    bottom: 23
  }
} );
