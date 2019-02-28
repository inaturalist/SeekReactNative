import { StyleSheet, Dimensions } from "react-native";
import {
  colors,
  padding,
  fonts,
  fontSize
} from "../global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  image: {
    width,
    height: 250
  },
  photoOverlay: {
    zIndex: 1,
    position: "absolute",
    right: 20,
    bottom: 20
  },
  ccButton: {
    backgroundColor: colors.black,
    opacity: 1,
    paddingRight: padding.medium,
    paddingLeft: padding.medium,
    paddingTop: padding.medium,
    paddingBottom: padding.medium,
    borderRadius: 40
  },
  ccButtonText: {
    fontFamily: fonts.semibold,
    fontSize: fontSize.text,
    color: colors.white
  }
} );
