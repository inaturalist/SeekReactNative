import { StyleSheet } from "react-native";
import {
  colors,
  center,
  row,
  dimensions
} from "../global";

const viewStyles = StyleSheet.create( {
  background: {
    backgroundColor: colors.white
  },
  center,
  errorContainer: {
    backgroundColor: colors.speciesError,
    marginTop: 18,
    paddingHorizontal: 28,
    paddingVertical: 28
  },
  row
} );

const textStyles = StyleSheet.create( {
  errorText: {
    marginLeft: 25,
    maxWidth: dimensions.width - ( 28 * 2 ) - 25 - 47,
    textAlign: "center"
  },
  text: {
    marginHorizontal: 28,
    marginTop: 20,
    textAlign: "center"
  }
} );

export {
  textStyles,
  viewStyles
};
