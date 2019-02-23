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
    width: 113,
    height: 113
  },
  circleText: {
    paddingTop: padding.iOSPadding,
    fontFamily: fonts.light,
    fontSize: 30
  }
} );
