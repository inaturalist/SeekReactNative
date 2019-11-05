import { StyleSheet } from "react-native";
import { dimensions } from "../global";

export default StyleSheet.create( {
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: dimensions.height > 570 ? 26 : 15
  }
} );
