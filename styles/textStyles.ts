import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "./global";

const headerText = {
  fontFamily: fonts.bold,
  fontSize: 18,
  letterSpacing: 1,
  lineHeight: 22
};

const buttonText = {
  fontFamily: fonts.bold,
  fontSize: 17,
  letterSpacing: 1,
  lineHeight: 21
};

const textStyles = StyleSheet.create( {
  headerWhite: {
    ...headerText,
    color: colors.white
  },
  buttonGreen: {
    ...buttonText,
    color: colors.seekForestGreen
    // Here was also: paddingTop: padding.iOSButtonPadding
  }
} );

export {
  textStyles
};
