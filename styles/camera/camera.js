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
    height: 105,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  capture: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 49 / 2,
    borderColor: colors.seekiNatGreen,
    width: 49,
    height: 49
  },
  placeholder: {
    width: 49
  },
  textCircle: {
    width: 29,
    height: 29,
    borderWidth: 1,
    borderRadius: 29 / 2,
    borderColor: colors.white,
    justifyContent: "center"
  },
  helpText: {
    textAlign: "center",
    color: colors.white,
    fontSize: 23
  }
} );
