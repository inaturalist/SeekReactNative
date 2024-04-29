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

const body = {
  fontFamily: fonts.regular,
  fontSize: 15,
  letterSpacing: 0,
  lineHeight: 21
};

const baseTextStyles = StyleSheet.create( {
  headerWhite: {
    ...headerText,
    color: colors.white
  },
  buttonGreen: {
    ...buttonText,
    color: colors.seekForestGreen
    // Here was also: paddingTop: padding.iOSButtonPadding
  },
  bodyBlack: {
    ...body,
    color: colors.black
  },
  bodyBlackSmallScreens: {
    ...body,
    color: colors.black,
    fontSize: 14,
    lineHeight: 14
  },
  bodyWhite: {
    ...body,
    color: colors.white
  }
} );

export {
  baseTextStyles
};
