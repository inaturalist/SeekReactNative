import { StyleSheet, Platform } from "react-native";
import { colors } from "../global";

export default StyleSheet.create( {
  container: {
    backgroundColor: Platform.OS === "android" ? colors.white : colors.seekForestGreen,
    flex: 1
  },
  containerWhite: {
    backgroundColor: colors.white
  },
  loadingWheel: {
    alignItems: "center",
    flexGrow: 1,
    justifyContent: "center"
  }
} );
