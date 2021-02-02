// @flow

import { StyleSheet } from "react-native";
import { dimensions } from "../global";

export default StyleSheet.create( {
  fullSizeImage: {
    height: dimensions.height,
    width: dimensions.width,
    resizeMode: "stretch"
  }
} );
