import { StyleSheet, PixelRatio } from "react-native";
import {
  colors,
  dimensions
} from "../../global";

const { getFontScale } = PixelRatio;

const viewStyles = StyleSheet.create( {
  greenButton: {
    alignSelf: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 34,
    height: getFontScale() > 1 ? 79 : 46,
    justifyContent: "center",
    maxWidth: 317,
    width: dimensions.width < 500 ? 293 : 317
  } as const,
  loginHeight: {
    height: 52,
    marginHorizontal: dimensions.height > 570 ? 34 : 20
  } as const
} );

const textStyles = StyleSheet.create( {
  buttonText: {
    textAlign: "center"
  } as const
} );

export {
  viewStyles,
  textStyles
};
