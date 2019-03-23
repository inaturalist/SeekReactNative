import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";


export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center"
  },
  errorText: {
    textAlign: "center",
    marginHorizontal: 41,
    fontSize: 19,
    lineHeight: 24,
    fontFamily: fonts.medium,
    color: colors.white
  }
} );
