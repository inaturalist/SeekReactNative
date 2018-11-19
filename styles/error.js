import { StyleSheet } from "react-native";
import { colors, fonts, fontSize } from "./global";


export default StyleSheet.create( {
  errorTitle: {
    fontSize: fontSize.largeHeader,
    color: colors.white,
    fontFamily: fonts.default,
    textAlign: "center"
  },
  error: {
    fontSize: fontSize.header,
    marginHorizontal: "10%",
    marginTop: "10%",
    marginBottom: "10%",
    color: colors.white,
    fontFamily: fonts.default,
    textAlign: "center"
  }
} );
