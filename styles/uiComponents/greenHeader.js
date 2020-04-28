import { StyleSheet } from "react-native";
import {
  center,
  colors,
  fonts,
  dimensions
} from "../global";

export default StyleSheet.create( {
  center,
  container: {
    backgroundColor: colors.seekForestGreen,
    flexDirection: "row",
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
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    maxWidth: dimensions.width - 100
  }
} );
