import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  padding
} from "../global";

export default StyleSheet.create( {
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: padding.iOSButtonPadding,
    textAlign: "center"
  },
  greenButton: {
    backgroundColor: colors.seekForestGreen,
    borderRadius: 34,
    height: 46,
    justifyContent: "center"
  }
} );
