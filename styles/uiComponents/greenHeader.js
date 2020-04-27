import { StyleSheet, PixelRatio } from "react-native";
import {
  colors,
  fonts,
  dimensions
} from "../global";

const { getFontScale } = PixelRatio;

console.log( getFontScale() );

export default StyleSheet.create( {
  container: {
    alignItems: "center",
    backgroundColor: colors.seekForestGreen,
    flexDirection: "row",
    height: 55,
    justifyContent: "center"
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
