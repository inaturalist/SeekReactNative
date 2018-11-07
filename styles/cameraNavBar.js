import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

export default StyleSheet.create( {
  bottomNavigation: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: margins.medium,
    paddingBottom: padding.extraLarge,
    backgroundColor: colors.black,
    height: 55
  },
  text: {
    fontSize: fontSize.smallText,
    color: colors.white,
    fontFamily: fonts.default,
    marginLeft: margins.medium
  },
  underline: {
    textDecorationLine: "underline"
  }
} );
