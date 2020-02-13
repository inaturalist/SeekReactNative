import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  padding,
  dimensions
} from "../../global";

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
    alignSelf: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 34,
    height: 46,
    justifyContent: "center",
    maxWidth: 317,
    width: dimensions.width < 500 ? 293 : 317
  },
  loginHeight: {
    height: 52,
    marginHorizontal: dimensions.height > 570 ? 34 : 20
  }
} );
