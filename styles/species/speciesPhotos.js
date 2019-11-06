import { StyleSheet, Dimensions, Platform } from "react-native";
import {
  colors,
  fonts
} from "../global";

const { width } = Dimensions.get( "screen" );

export default StyleSheet.create( {
  ccButton: {
    bottom: 0,
    padding: 15,
    position: "absolute",
    right: 0,
    zIndex: 1
  },
  ccButtonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 16,
    paddingBottom: Platform.OS === "ios" ? 3 : 5,
    paddingHorizontal: 5,
    paddingTop: Platform.OS === "ios" ? 8 : 5
  },
  ccView: {
    backgroundColor: colors.black,
    borderRadius: 40
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
    left: 0,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 20,
    paddingTop: 20,
    position: "absolute",
    top: 100,
    zIndex: 1
  },
  photoContainer: {
    backgroundColor: colors.black,
    height: 250
  },
  rightArrow: {
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 5,
    paddingTop: 20,
    position: "absolute",
    right: 0,
    top: 100,
    zIndex: 1
  }
} );
