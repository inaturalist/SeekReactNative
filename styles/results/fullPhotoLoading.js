import { StyleSheet } from "react-native";
import { colors } from "../global";

export default StyleSheet.create( {
  imageBackground: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.black
  },
  contain: {
    resizeMode: "contain"
  }
} );
