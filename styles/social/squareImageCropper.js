import { StyleSheet } from "react-native";

import { colors, dimensions } from "../global";

const viewStyles = StyleSheet.create( {
  container: {
    // creates black padding at top and bottom
    paddingVertical: ( dimensions.height - dimensions.width - 55 - 91 ) / 3,
    backgroundColor: colors.black
  },
  imageCropper: {
    alignSelf: "center"
  }
} );

export default viewStyles;
