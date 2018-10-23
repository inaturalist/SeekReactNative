import { Dimensions, StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins
} from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  container: {
    position: "absolute",
    width,
    height: height / 10
  },
  text: {
    fontSize: fontSize.text,
    textAlign: "left",
    color: colors.white,
    fontFamily: fonts.default,
    marginTop: margins.large,
    marginLeft: margins.medium,
    marginBottom: margins.medium
  }
} );
