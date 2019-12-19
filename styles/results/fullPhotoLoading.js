import { StyleSheet } from "react-native";
import { dimensions } from "../global";

export default StyleSheet.create( {
  imageBackground: {
    height: dimensions.height,
    width: dimensions.width
  },
  loading: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  }
} );
