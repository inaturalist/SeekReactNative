const { Platform } = require( "react-native" );

export const colors = {
  white: "#ffffff",
  black: "#000000",
  darkBlue: "#37535e",
  darkDesaturatedBlue: "#1f3d48",
  darkestBlue: "#0C2D3B",
  blueShadow: "#0d2d3a",
  lightGreen: "#b3ff5a",
  iNatGreen: "#74ac00",
  darkGreen: "#4CAF50",
  lightGray: "#f5f5f5",
  darkGray: "#393939",
  lightBlue: "#225C8E",
  tomatoRed: "#ff6347",
  yellow: "#ffff7f",
  blue: "#0266C8",
  seekiNatGreen: "#77b300",
  seekTeal: "#297f87",
  seekGreen: "#44ab55",
  seekForestGreen: "#38976d",
  dividerGray: "#d8d8d8",
  errorGray: "#4a4a4a",
  circleGray: "#f0f0f0"
};

export const fonts = {
  default: Platform.OS === "ios" ? "Whitney-Medium" : "Whitney-Medium-Pro",
  semibold: Platform.OS === "ios" ? "Whitney-Semibold" : "Whitney-Semibold-Pro",
  playful: Platform.OS === "ios" ? "Riffic-Bold" : "riffic-bold",
  book: Platform.OS === "ios" ? "Whitney-Book" : "Whitney-Book-Pro",
  light: Platform.OS === "ios" ? "Whitney-Light" : "Whitney-Light-Pro",
  bookItalic: Platform.OS === "ios" ? "Whitney-BookItalic" : "Whitney-BookItalic-Pro"
};

export const fontSize = {
  largeHeader: 36,
  mediumLargeHeader: 28,
  mediumHeader: 24,
  header: 20,
  buttonText: 18,
  text: 16,
  smallText: 14
};

export const margins = {
  extraSmall: 2,
  small: 10,
  medium: 15,
  mediumLarge: 30,
  large: 40,
  extraLarge: 100
};

export const padding = {
  extraSmall: 1,
  small: 2,
  medium: 5,
  large: 15,
  extraLarge: 20,
  iOSPadding: Platform.OS === "ios" ? 8 : 0,
  buttonTop: 11,
  buttonBottom: 9.5
};
