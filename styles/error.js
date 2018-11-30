import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  fontSize,
  margins
} from "./global";


export default StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  errorTitle: {
    fontSize: fontSize.largeHeader,
    color: colors.white,
    fontFamily: fonts.default,
    textAlign: "center"
  },
  error: {
    fontSize: fontSize.header,
    color: colors.white,
    fontFamily: fonts.default,
    textAlign: "center",
    marginHorizontal: margins.medium
  }
} );
