import { StyleSheet, Platform, Dimensions } from "react-native";
import { fonts, colors } from "../global";

const { height } = Dimensions.get( "window" );

export default StyleSheet.create( {
  text: {
    fontFamily: fonts.semibold,
    color: colors.seekiNatGreen,
    fontSize: 17
  },
  errorMargin: {
    marginTop: ( Platform.OS === "android" || height < 570 ) ? 28 : 55,
    marginBottom: 28,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    width: 240,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  image: {
    marginRight: 15
  }
} );
