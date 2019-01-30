import { StyleSheet, Platform } from "react-native";
import {
  colors,
  fonts,
  margins
} from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Platform.OS === "android" ? margins.medium + 5 : margins.medium,
    marginHorizontal: margins.medium
  },
  text: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.default,
    textAlign: "center"
  }
} );
