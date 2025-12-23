import { StyleSheet } from "react-native";

import { dimensions } from "../global";

const imageStyles = StyleSheet.create( {
  fullSizeImage: {
    height: dimensions.height,
    width: dimensions.width,
    resizeMode: "stretch",
  },
} );

export default imageStyles;
