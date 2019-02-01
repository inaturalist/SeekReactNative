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
  loadingWheel: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  footer: {
    height: 80,
    flexDirection: "row",
    justifyContent: "center"
  },
  capture: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 49 / 2,
    borderColor: colors.seekiNatGreen,
    width: 49,
    height: 49
  }
} );
