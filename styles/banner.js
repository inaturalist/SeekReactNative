import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins
} from "./global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  background: {
    backgroundColor: colors.white,
    height: 42,
    width
  },
  mainBackground: {
    top: 35,
    zIndex: 1
  },
  text: {
    fontFamily: fonts.default,
    fontSize: fontSize.text,
    fontWeight: "500",
    color: colors.black,
    marginTop: margins.small,
    marginBottom: margins.small,
    textAlign: "center"
  }
} );
