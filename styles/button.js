import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

export default StyleSheet.create( {
  button: {
    backgroundColor: colors.white,
    color: colors.black,
    marginHorizontal: margins.large,
    marginBottom: margins.small,
    marginTop: margins.small,
    borderRadius: 40
  },
  buttonText: {
    fontFamily: fonts.semibold,
    paddingTop: padding.medium,
    paddingBottom: padding.small,
    fontSize: fontSize.buttonText,
    textAlign: "center",
    justifyContent: "center"
  }
} );
