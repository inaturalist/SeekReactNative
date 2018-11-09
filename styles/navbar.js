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
    backgroundColor: colors.lightGray,
    borderBottomWidth: 0.25,
    borderColor: colors.darkGray
  },
  text: {
    fontSize: fontSize.mediumHeader,
    textAlign: "left",
    color: colors.black,
    fontFamily: fonts.default,
    marginTop: margins.medium + 5,
    marginLeft: margins.medium
  }
} );
