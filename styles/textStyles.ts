import { StyleSheet, PixelRatio } from "react-native";
import {
  colors,
  fonts
} from "./global";

const fontScale = PixelRatio.getFontScale( );

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

const emptyState = {
  fontFamily: fonts.medium,
  fontSize: 18,
  letterSpacing: 0,
  lineHeight: 24
};

const highlight = {
  fontFamily: fonts.bold,
  fontSize: 17,
  letterSpacing: 1,
  lineHeight: 24
};

const challengeMonth = {
  color: colors.white,
  fontFamily: fonts.regular,
  fontSize: ( fontScale > 1 ) ? 15 : 17,
  letterSpacing: 0.75,
  lineHeight: 21
};

const challengeTitle = {
  color: colors.white,
  fontFamily: fonts.bold,
  fontSize: ( fontScale > 1 ) ? 19 : 22,
  letterSpacing: 1.0,
  lineHeight: 27
};

const baseTextStyles = StyleSheet.create( {
  headerWhite: {
    ...headerText,
    color: colors.white
  },
  headerGreen: {
    ...headerText,
    color: colors.seekForestGreen
  },
  buttonGreen: {
    ...buttonText,
    color: colors.seekForestGreen
  },
  buttonWhite: {
    ...buttonText,
    color: colors.white
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
  },
  emptyStateGreen: {
    ...emptyState,
    color: colors.seekForestGreen
  },
  emptyStateBlack: {
    ...emptyState,
    color: colors.black
  },
  highlightGreen: {
    ...highlight,
    color: colors.seekForestGreen
  },
  challengeMonth,
  challengeTitle
} );

export {
  baseTextStyles
};
