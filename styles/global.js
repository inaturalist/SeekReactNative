const { Platform, Dimensions } = require( "react-native" );

const { width, height } = Dimensions.get( "window" );

export const colors = {
  white: "#ffffff",
  black: "#000000",
  lightGray: "#f5f5f5",
  darkGray: "#393939",
  seekiNatGreen: "#77b300",
  seekTeal: "#297f87",
  seekGreen: "#44ab55",
  seekForestGreen: "#38976d",
  speciesNearbyGreen: "#2a7353",
  dividerGray: "#d8d8d8",
  errorGray: "#4a4a4a",
  circleGray: "#f0f0f0",
  red: "#973838",
  transparent: "transparent"
};

export const fonts = {
  medium: Platform.OS === "ios" ? "Whitney-Medium" : "Whitney-Medium-Pro",
  semibold: Platform.OS === "ios" ? "Whitney-Semibold" : "Whitney-Semibold-Pro",
  book: Platform.OS === "ios" ? "Whitney-Book" : "Whitney-Book-Pro",
  light: Platform.OS === "ios" ? "Whitney-Light" : "Whitney-Light-Pro",
  bookItalic: Platform.OS === "ios" ? "Whitney-BookItalic" : "Whitney-BookItalic-Pro",
  boldItalic: Platform.OS === "ios" ? "Whitney-BoldItalic" : "Whitney-BoldItalic-Pro"
};

export const padding = {
  iOSPadding: Platform.OS === "ios" ? 8 : 0,
  iOSButtonPadding: Platform.OS === "ios" ? 7 : 0
};

export const touchable = {
  left: 23,
  right: 23,
  top: 23,
  bottom: 23
};

export const dimensions = {
  width,
  height
};
