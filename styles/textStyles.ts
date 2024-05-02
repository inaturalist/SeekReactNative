import { StyleSheet, PixelRatio } from "react-native";
import {
  colors,
  fonts
} from "./global";

const fontScale = PixelRatio.getFontScale( );

const regular = {
  color: colors.black,
  fontFamily: fonts.regular

};
const italic = {
  color: colors.black,
  fontFamily: fonts.italic
};
const medium = {
  color: colors.black,
  fontFamily: fonts.medium
};

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
  fontSize: ( fontScale > 1 ) ? 15 : 17,
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

const banner = {
  color: colors.white,
  fontFamily: fonts.bold,
  fontSize: 18,
  letterSpacing: 1,
  lineHeight: 22
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

const smallLightHeading = {
  color: colors.black,
  fontFamily: fonts.regular,
  fontSize: 13,
  letterSpacing: 0.75,
  lineHeight: 16
};

const challengeItemTitle = {
  color: colors.seekForestGreen,
  fontFamily: fonts.semibold,
  fontSize: 16,
  letterSpacing: 0.89,
  lineHeight: 20
};

const challengeItemButton = {
  color: colors.seekForestGreen,
  fontFamily: fonts.bold,
  fontSize: 13,
  lineHeight: 17
};

const toastLink = {
  color: colors.black,
  fontFamily: fonts.regular,
  fontSize: 13,
  lineHeight: 21
};

const species = {
  color: colors.black,
  fontFamily: fonts.regular,
  fontSize: 29,
  lineHeight: 35
};

const baseTextStyles = StyleSheet.create( {
  regular,
  regularGray: {
    ...regular,
    color: colors.errorGray
  },
  italic,
  medium,
  mediumWhite: {
    ...medium,
    color: colors.white
  },
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
  buttonWhite: {
    ...button,
    color: colors.white
  },
  buttonGray: {
    ...button,
    color: colors.settingsGray
  },
  body,
  bodySmall: {
    ...body,
    fontSize: 13,
    lineHeight: 21
  },
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
  bodyTeal: {
    ...body,
    color: colors.seekTeal
  },
  bodyMedium: {
    ...body,
    color: colors.seekForestGreen,
    fontFamily: fonts.medium
  },
  bodyMediumWhite: {
    ...body,
    color: colors.white,
    fontFamily: fonts.medium
  },
  bodyBold: {
    ...body,
    fontFamily: fonts.bold
  },
  emptyState,
  emptyStateGreen: {
    ...emptyState,
    color: colors.seekForestGreen
  },
  highlight,
  highlightTeal: {
    ...highlight,
    color: colors.seekTeal
  },
  banner,
  bannerSmall: {
    ...banner,
    fontSize: 14,
    letterSpacing: 0.42,
    lineHeight: 34
  },
  challengeMonth,
  challengeTitle,
  challengeDescription,
  smallLightHeading,
  challengeItemTitle,
  challengeItemButton,
  toastLink,
  species
} );

export {
  baseTextStyles
};
