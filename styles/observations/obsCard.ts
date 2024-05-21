import { StyleSheet } from "react-native";

import { row, dimensions } from "../global";

const viewStyles = StyleSheet.create( {
  card: {
    paddingHorizontal: 24,
    width: dimensions.width + 73 + 24,
    paddingVertical: 9
  },
  deleteButton: {
    justifyContent: "center"
  },
  animatedView: {
    position: "absolute",
    top: 0,
    left: 0
  },
  row
} );

export default viewStyles;
