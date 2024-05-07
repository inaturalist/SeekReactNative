import { StyleSheet, PixelRatio } from "react-native";
import {
  colors,
  padding,
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
  },
  loginHeight: {
    height: 52,
    marginHorizontal: dimensions.height > 570 ? 34 : 20
  }
} );

const textStyles = StyleSheet.create( {
  buttonText: {
    paddingTop: padding.iOSButtonPadding,
    textAlign: "center"
  }
} );

export {
  viewStyles,
  textStyles
};
