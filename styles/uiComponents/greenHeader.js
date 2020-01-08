import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  container: {
    backgroundColor: colors.seekForestGreen,
    height: 55
  },
  help: {
    paddingBottom: 13,
    paddingHorizontal: 21,
    paddingTop: 13,
    position: "absolute",
    right: 0
  },
  text: {
    alignSelf: "center",
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "android" ? 18 : 20,
    position: "absolute"
  }
} );
