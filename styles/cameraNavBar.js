import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins
} from "./global";

export default StyleSheet.create( {
  container: {
    flex: 0.5,
    backgroundColor: colors.black,
    borderBottomWidth: 0.25,
    borderColor: colors.white
  },
  text: {
    fontSize: fontSize.mediumHeader,
    textAlign: "left",
    color: colors.white,
    fontFamily: fonts.default,
    marginTop: margins.medium + 5,
    marginLeft: margins.medium
  }
} );
