import { StyleSheet } from "react-native";
import { dimensions } from "../../global";

const viewStyles = StyleSheet.create( {
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: dimensions.height > 570 ? 26 : 15,
  },
} );

export default viewStyles;
