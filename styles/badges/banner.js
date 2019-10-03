import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts
} from "../global";

export default StyleSheet.create( {
  banner: {
    height: 48,
    marginBottom: 32,
    marginTop: 40,
    paddingTop: Platform.OS === "android" ? 5 : 8,
    width: 284
  },
  bannerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    textAlign: "center"
  }
} );
