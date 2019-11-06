import { StyleSheet } from "react-native";
import { dimensions } from "../global";

export default StyleSheet.create( {
  imageBackground: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  loading: {
    position: "absolute",
    top: dimensions.height / 2 - 50
  }
} );
