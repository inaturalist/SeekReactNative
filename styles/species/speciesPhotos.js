import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  ccButton: {
    backgroundColor: colors.black,
    borderRadius: 40,
    opacity: 1,
    paddingBottom: Platform.OS === "ios" ? 3 : 5,
    paddingHorizontal: 5,
    paddingTop: Platform.OS === "ios" ? 8 : 5
  },
  ccButtonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16
  },
  fullWidth: {
    width
  },
  image: {
    height: 250,
    resizeMode: "contain",
    width
  },
  leftArrow: {
    left: 5,
    position: "absolute",
    top: 120,
    zIndex: 1
  },
  photoContainer: {
    backgroundColor: colors.black,
    height: 250
  },
  photoOverlay: {
    bottom: 20,
    position: "absolute",
    right: 20,
    zIndex: 1
  },
  rightArrow: {
    position: "absolute",
    right: 5,
    top: 120,
    zIndex: 1
  }
} );
