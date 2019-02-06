import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  banner: {
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 5,
    width: 284,
    height: 48
  },
  bannerText: {
    textAlign: "center",
    fontSize: 19,
    fontFamily: fonts.semibold,
    color: colors.white,
    letterSpacing: 1.12
  }
} );
