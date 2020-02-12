import { StyleSheet } from "react-native";
import { colors, dimensions } from "../global";

export default StyleSheet.create( {
  innerContainer: {
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.white,
    borderRadius: 40,
    maxHeight: 536,
    maxWidth: 366,
    width: dimensions.width - dimensions.width * 0.1
    // this creates margins on smaller screen sizes
  }
} );
