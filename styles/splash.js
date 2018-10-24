import { Dimensions, StyleSheet } from "react-native";
import { colors, fonts, fontSize } from "./global";

const { width, height } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  backgroundImage: {
    justifyContent: "center",
    alignItems: "center",
    width,
    height,
    resizeMode: "cover"
  },
  text: {
    fontSize: fontSize.text,
    textAlign: "center",
    color: colors.white,
    fontFamily: fonts.default,
    marginBottom: 25
  }
} );
