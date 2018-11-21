import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins,
  padding
} from "./global";

export default StyleSheet.create( {
  header: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    fontSize: fontSize.medium,
    color: colors.white,
    fontFamily: fonts.default
  },
  footer: {
    flex: 0.2,
    marginTop: margins.medium,
    paddingBottom: padding.extraSmall,
    backgroundColor: colors.black
  }
} );
