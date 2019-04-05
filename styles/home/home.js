import { StyleSheet } from "react-native";
import { colors } from "../global";

export default StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  safeViewTop: {
    flex: 0,
    backgroundColor: colors.seekForestGreen
  },
  safeView: {
    flex: 1,
    backgroundColor: "transparent"
  },
  iosSpacer: {
    backgroundColor: colors.seekForestGreen,
    height: 1000,
    position: "absolute",
    top: -1000,
    left: 0,
    right: 0
  }
} );
