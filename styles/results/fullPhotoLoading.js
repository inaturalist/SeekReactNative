import { StyleSheet } from "react-native";
import { dimensions } from "../global";

export default StyleSheet.create( {
  imageBackground: {
    height: dimensions.height,
    width: dimensions.width
  },
  loading: {
    left: dimensions.width / 2 - 15,
    position: "absolute",
    top: dimensions.height / 2 - 50,
    zIndex: 1
  }
} );
