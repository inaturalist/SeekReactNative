import { StyleSheet, Platform } from "react-native";
import { colors, fonts, touchable } from "../global";

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.seekForestGreen,
    height: 55
  },
  help: {
    alignSelf: "flex-end",
    right: 21,
    top: -32
  },
  text: {
    alignSelf: "center",
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "android" ? 18 : 21,
    position: "absolute"
  },
  touchable
} );
