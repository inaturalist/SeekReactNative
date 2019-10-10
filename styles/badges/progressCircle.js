import { StyleSheet } from "react-native";
import {
  fonts,
  padding
} from "../global";

export default StyleSheet.create( {
  center: {
    alignItems: "center",
    justifyContent: "center"
  },
  circleStyle: {
    height: 113,
    width: 113
  },
  circleText: {
    fontFamily: fonts.light,
    fontSize: 30,
    paddingTop: padding.iOSPadding
  }
} );
