import { StyleSheet } from "react-native";
import { colors } from "../global";

const viewStyles = StyleSheet.create( {
  greenButton: {
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 6,
    paddingVertical: 6,
  },
} );

const textStyles = StyleSheet.create( {
  greenButtonText: {
    paddingHorizontal: 10,
  },
} );

export {
  textStyles,
  viewStyles,
};
