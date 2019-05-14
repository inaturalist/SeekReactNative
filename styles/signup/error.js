import { StyleSheet, Platform, Dimensions } from "react-native";
import { fonts, colors } from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  text: {
    fontFamily: fonts.semibold,
    color: colors.seekiNatGreen,
    fontSize: 18
  },
  errorMargin: {
    marginTop: ( Platform.OS === "android" || height < 570 ) ? 28 : 55,
    marginBottom: 28
  }
} );
