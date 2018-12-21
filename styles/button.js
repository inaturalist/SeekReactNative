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
    marginHorizontal: margins.mediumLarge,
    alignItems: "center",
    justifyContent: "center",
    marginTop: margins.medium,
    marginBottom: margins.medium,
    borderRadius: 40
  },
  buttonText: {
    fontFamily: fonts.semibold,
    color: colors.black,
    paddingTop: padding.buttonTop,
    paddingBottom: padding.buttonBottom,
    fontSize: fontSize.buttonText,
    textAlign: "center",
    justifyContent: "center"
  },
  greenButton: {
    backgroundColor: colors.darkGreen,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center"
  },
  greenButtonText: {
    fontFamily: fonts.playful,
    color: colors.darkBlue
  },
  plus: {
    paddingRight: padding.medium,
    paddingTop: padding.medium
  }
} );
