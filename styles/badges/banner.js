import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  banner: {
    marginTop: 20,
    marginBottom: 20,
    paddingTop: Platform.OS === "android" ? 5 : 7,
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
