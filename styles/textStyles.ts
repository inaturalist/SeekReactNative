import { StyleSheet, PixelRatio } from "react-native";
import {
  colors,
  fonts
} from "./global";

const fontScale = PixelRatio.getFontScale( );

const header = {
  color: colors.seekForestGreen,
  fontFamily: fonts.bold,
  fontSize: 18,
  letterSpacing: 1,
  lineHeight: 22
};

const button = {
  color: colors.white,
  fontFamily: fonts.bold,
  fontSize: 17,
  letterSpacing: 1,
  lineHeight: 21
};

const body = {
  color: colors.black,
  fontFamily: fonts.regular,
  fontSize: 15,
  letterSpacing: 0,
  lineHeight: 21
};

const emptyState = {
  color: colors.black,
  fontFamily: fonts.medium,
  fontSize: 18,
  letterSpacing: 0,
  lineHeight: 24
};

const highlight = {
  color: colors.seekForestGreen,
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

const challengeDescription = {
  color: colors.white,
  fontFamily: fonts.medium,
  fontSize: 16,
  lineHeight: 24
};

const baseTextStyles = StyleSheet.create( {
  header,
  headerWhite: {
    ...header,
    color: colors.white
  },
  button,
  buttonGreen: {
    ...button,
    color: colors.seekForestGreen
  },
  body,
  bodyBlackSmallScreens: {
    ...body,
    fontSize: 14,
    lineHeight: 14
  },
  bodyWhite: {
    ...body,
    color: colors.white
  },
  bodyGreen: {
    ...body,
    color: colors.seekForestGreen
  },
  emptyState,
  emptyStateGreen: {
    ...emptyState,
    color: colors.seekForestGreen
  },
  highlight,
  challengeMonth,
  challengeTitle,
  challengeDescription
} );

export {
  baseTextStyles
};
