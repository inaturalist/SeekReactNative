import { StyleSheet, Platform } from "react-native";
import { fonts } from "../global";

export default StyleSheet.create( {
  circleStyle: {
    height: 59,
    width: 59
  },
  circleText: {
    fontFamily: fonts.book,
    fontSize: 20,
    paddingTop: Platform.OS === "ios" ? 7 : 0
  }
} );
