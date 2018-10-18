import { StyleSheet } from "react-native";
import { colors, fonts, fontSize } from "./global";


export default StyleSheet.create( {
  backgroundImage: {
    alignItems: "center"
  },
  error: {
    fontSize: fontSize.header,
    marginHorizontal: "10%",
    marginTop: "10%",
    marginBottom: "10%",
    lineHeight: 18,
    color: colors.white,
    fontFamily: fonts.default
  }
} );
