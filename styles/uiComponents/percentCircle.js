import { StyleSheet, Platform } from "react-native";
import { fonts, padding, center } from "../global";

export default StyleSheet.create( {
  center,
  circleStyle: {
    height: 59,
    width: 59
  },
  circleText: {
    fontFamily: fonts.book,
    fontSize: 20,
    paddingTop: Platform.OS === "ios" ? 7 : 0
  },
  largeCircleStyle: {
    height: 113,
    width: 113
  },
  largeCircleText: {
    fontFamily: fonts.light,
    fontSize: 30,
    paddingTop: padding.iOSPadding
  }
} );
