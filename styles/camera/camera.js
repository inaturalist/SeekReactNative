import { StyleSheet } from "react-native";
import { colors } from "../global";

export default StyleSheet.create( {
  container: {
    backgroundColor: "transparent",
    flex: 1
  },
  safeView: {
    flex: 1,
    backgroundColor: colors.black
  },
  main: {
    flexGrow: 1
  },
  footer: {
    height: 80,
    flexDirection: "row",
    justifyContent: "center"
  },
  capture: {
    backgroundColor: colors.white,
    borderWidth: 3,
    borderRadius: 100,
    borderColor: colors.darkGray,
    width: 50,
    height: 50
  }
} );
