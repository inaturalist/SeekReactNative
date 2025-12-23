import { StyleSheet } from "react-native";
import { dimensions } from "../../global";

const viewStyles = StyleSheet.create( {
  noTaxon: {
    width: dimensions.width,
    alignItems: "center",
    justifyContent: "center",
  },
} );

const textStyles = StyleSheet.create( {
  cellTitleText: {
    textAlign: "center",
    maxWidth: 322,
  },
} );

export {
  textStyles,
  viewStyles,
};
