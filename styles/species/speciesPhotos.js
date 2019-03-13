import { StyleSheet, Dimensions, Platform } from "react-native";
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
    height: 250,
    resizeMode: "contain"
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
    paddingHorizontal: 5,
    paddingTop: Platform.OS === "ios" ? 8 : 5,
    paddingBottom: Platform.OS === "ios" ? 3 : 5,
    borderRadius: 40
  },
  ccButtonText: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.white
  }
} );
