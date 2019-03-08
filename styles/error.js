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
    fontSize: 36,
    color: colors.white,
    fontFamily: fonts.medium,
    textAlign: "center"
  },
  error: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fonts.medium,
    textAlign: "center",
    marginHorizontal: 15
  }
} );
