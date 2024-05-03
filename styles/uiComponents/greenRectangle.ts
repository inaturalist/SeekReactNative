import { StyleSheet } from "react-native";
import { colors, padding } from "../global";

const viewStyles = StyleSheet.create( {
  greenButton: {
    backgroundColor: colors.seekiNatGreen,
    borderRadius: 6,
    paddingVertical: 6
  }
} );

const textStyles = StyleSheet.create( {
  greenButtonText: {
    paddingHorizontal: 10,
    paddingTop: padding.iOSButtonPadding
  }
} );

export {
  textStyles,
  viewStyles
};
