import { StyleSheet } from "react-native";
import {
  fonts,
  padding
} from "../global";

export default StyleSheet.create( {
  circleStyle: {
    width: 59,
    height: 59
  },
  circleText: {
    paddingTop: padding.iOSPadding,
    fontFamily: fonts.book,
    fontSize: 20
  }
} );
