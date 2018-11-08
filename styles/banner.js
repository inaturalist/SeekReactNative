import { StyleSheet, Dimensions } from "react-native";
import { colors, fonts, fontSize } from "./global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  background: {
    backgroundColor: colors.white,
    height: 42,
    width
  },
  text: {
    fontFamily: fonts.default,
    fontSize: fontSize.text,
    color: colors.black
  }
} );
