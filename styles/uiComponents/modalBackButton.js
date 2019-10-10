import { StyleSheet } from "react-native";
import { dimensions } from "../global";

export default StyleSheet.create( {
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: dimensions.height > 570 ? 15 : 0,
    padding: 20
  }
} );
