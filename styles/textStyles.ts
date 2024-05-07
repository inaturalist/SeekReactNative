import { StyleSheet, PixelRatio, Dimensions, Platform } from "react-native";

import {
  colors,
  fonts
} from "./global";
import { enabledLargeFonts } from "../utility/textHelpers";

const { height } = Dimensions.get( "window" );

const fontScale = PixelRatio.getFontScale( );

const regular = {
  color: colors.black,
  fontFamily: fonts.regular
};
const bold = {
  color: colors.black,
  fontFamily: fonts.bold
};
const boldItalic = {
  fontFamily: fonts.boldItalic
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

const buttonSmall = {
  color: colors.white,
  fontFamily: fonts.bold,
  fontSize: ( fontScale > 1 ) ? 13 : 15,
  lineHeight: 21
};

const body = {
  color: colors.black,
  fontFamily: fonts.regular,
  fontSize: 15,
  letterSpacing: 0,
  lineHeight: 21
};

const bodySpaced = {
  color: colors.black,
  fontFamily: fonts.regular,
  fontSize: 15,
  letterSpacing: 0,
  lineHeight: 23
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

const modalBanner = {
  color: colors.white,
  fontFamily: fonts.bold,
  fontSize: 18,
  letterSpacing: 1.12
};

const sideMenu = {
  color: colors.white,
  fontFamily: fonts.bold,
  fontSize: 17,
  letterSpacing: 1.0
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
  fontFamily: fonts.bold,
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
  lineHeight: 35,
  letterSpacing: 0.3
};

const speciesSmall = {
  color: colors.black,
  fontFamily: fonts.italic,
  fontSize: 18,
  lineHeight: 21
};

const link = {
  color: colors.linkText,
  fontFamily: fonts.regular,
  fontSize: 17,
  textDecorationLine: "underline" as const
};

const forgotPasswordLink = {
  color: colors.seekForestGreen,
  fontFamily: fonts.regular,
  fontSize: 16,
  lineHeight: 21,
  textDecorationLine: "underline" as const
};

const number = {
  color: colors.black,
  fontFamily: fonts.regular,
  fontSize: 19,
  lineHeight: 21
};

const chartAxis = {
  fill: colors.seekTeal,
  fontFamily: fonts.regular,
  fontSize: 18
};

const onboarding = {
  color: colors.white,
  fontFamily: fonts.medium,
  fontSize: height > 570 ? 19 : 16,
  lineHeight: 24
};

const prediction = {
  color: colors.white,
  fontFamily: fonts.bold,
  fontSize: 20
};

const picker = {
  color: colors.seekForestGreen,
  fontFamily: fonts.bold,
  fontSize: enabledLargeFonts() ? 13 : 18,
  letterSpacing: Platform.OS === "ios" ? 1.0 : 0
};

const inputField = {
  color: colors.black,
  fontFamily: fonts.regular,
  fontSize: 15
};

const postSectionHeader = {
  color: colors.seekForestGreen,
  fontFamily: fonts.bold,
  fontSize: 17,
  letterSpacing: 1.0
};

const loginOrSignup = {
  color: colors.white,
  fontFamily: fonts.medium,
  fontSize: 17,
  lineHeight: 19
};

const loginError = {
  color: colors.seekiNatGreen,
  fontFamily: fonts.bold,
  fontSize: 17
};

const passwordEmailHeader = {
  color: colors.seekForestGreen,
  fontFamily: fonts.bold,
  fontSize: 23,
  letterSpacing: 1.0,
  lineHeight: 30
};

const linkedAccountHeader = {
  color: colors.black,
  fontFamily: fonts.medium,
  fontSize: 21,
  lineHeight: 28
};

const donationLink = {
  color: colors.greenGradientLight,
  fontFamily: fonts.regular,
  fontSize: 17,
  letterSpacing: 1.0
};

const coords = {
  color: colors.placeholderGray,
  fontFamily: fonts.regular,
  fontSize: 12
};

const baseTextStyles = StyleSheet.create( {
  regular,
  regularGray: {
    ...regular,
    color: colors.errorGray
  },
  bold,
  boldItalic,
  italic,
  italicWhite: {
    ...italic,
    color: colors.white
  },
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
  buttonSmall,
  buttonGreen: {
    ...button,
    color: colors.seekForestGreen
  },
  buttonRegular: {
    ...button,
    fontFamily: fonts.regular
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
    color: colors.black,
    fontFamily: fonts.medium
  },
  bodyMediumGreen: {
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
  bodyItalic: {
    ...body,
    fontFamily: fonts.italic
  },
  bodySpaced,
  bodySpacedMedium: {
    ...bodySpaced,
    fontFamily: fonts.medium
  },
  emptyState,
  emptyStateGreen: {
    ...emptyState,
    color: colors.seekForestGreen
  },
  emptyStateWhite: {
    ...emptyState,
    color: colors.white
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
  modalBanner,
  modalBannerGreen: {
    ...modalBanner,
    color: colors.seekForestGreen
  },
  challengeMonth,
  challengeTitle,
  challengeDescription,
  smallLightHeading,
  challengeItemTitle,
  challengeItemTitleWhite: {
    ...challengeItemTitle,
    color: colors.white
  },
  challengeItemButton,
  toastLink,
  species,
  speciesSmall,
  link,
  number,
  chartAxis,
  onboarding,
  prediction,
  picker,
  inputField,
  postSectionHeader,
  loginOrSignup,
  forgotPasswordLink,
  loginError,
  passwordEmailHeader,
  linkedAccountHeader,
  donationLink,
  sideMenu,
  coords
} );

export {
  baseTextStyles
};
