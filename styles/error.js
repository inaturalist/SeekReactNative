import { StyleSheet } from "react-native";
import { colors, fonts, fontSize } from "./global";


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
    textAlign: "center"
  }
} );
