import { StyleSheet } from "react-native";
import {
  colors,
  fonts,
  center,
  dimensions
} from "../global";

export default StyleSheet.create( {
  blackBackground: {
    backgroundColor: colors.black,
    height: dimensions.height
  },
  center,
  errorText: {
    color: colors.white,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    marginHorizontal: 41,
    textAlign: "center"
  },
  galleryHeight: {
    height: dimensions.height - 100
  },
  margin: {
    marginTop: 38
  }
} );
