import { StyleSheet, Platform } from "react-native";
import {
  fonts
} from "../global";

export default StyleSheet.create( {
  circleStyle: {
    width: 59,
    height: 59
  },
  circleText: {
    paddingTop: Platform.OS === "ios" ? 7 : 0,
    fontFamily: fonts.book,
    fontSize: 20
  }
} );
