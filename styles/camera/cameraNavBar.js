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
    marginHorizontal: 25
  },
  backButton: {
    padding: 10
  },
  buttons: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 14,
    color: colors.white,
    fontFamily: fonts.default,
    textAlign: "center"
  }
} );
