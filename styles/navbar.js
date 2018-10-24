import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins
} from "./global";

export default StyleSheet.create( {
  container: {
    flex: 0.7,
    backgroundColor: colors.darkestBlue,
    borderBottomWidth: 0.25,
    borderColor: colors.white
  },
  text: {
    fontSize: fontSize.text,
    textAlign: "left",
    color: colors.white,
    fontFamily: fonts.default,
    marginTop: margins.large,
    marginLeft: margins.medium
  }
} );
