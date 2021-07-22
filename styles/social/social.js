// @flow

import { StyleSheet, PixelRatio } from "react-native";
import { colors, center, fonts, dimensions, row, padding } from "../global";

const { getFontScale } = PixelRatio;

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center,
  header: {
    backgroundColor: colors.white,
    height: 55
  },
  spaceBeforeButtons: {
    marginTop: 23
  },
  spaceBetweenButtons: {
    marginTop: 23
  },
  photoTabs: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  roundedIndicator: {
    backgroundColor: colors.seekGreen,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 4,
    width: 138
  },
  hiddenIndicator: {
    backgroundColor: colors.white,
    height: 4,
    width: 138
  },
  row,
  checkboxRow: {
    marginLeft: 12
  },
  checkbox: {
    paddingHorizontal: 12,
    paddingVertical: 17
  },
  cropScreenContainer: {
    flex: 1
  },
  cropFooter: {
    height: 91,
    justifyContent: "center"
  },
  imageCropContainer: {
    flex: 1
  },
  cropButton: {
    paddingVertical: 11,
    paddingHorizontal: 10,
    alignItems: "flex-end"
  },
  cropView: {
    height: dimensions.height - 55 - 91 - 46,
    backgroundColor: colors.black
  },
  hiddenCropView: {
    flex: 1
  },
  backButton: {
    left: 0,
    paddingVertical: 18,
    paddingHorizontal: 23,
    position: "absolute",
    zIndex: 1
  },
  overlay: {
    opacity: 0.25
  },
  centerCropButton: {
    justifyContent: "center"
  },
  greenButton: {
    alignSelf: "center",
    backgroundColor: colors.seekForestGreen,
    borderRadius: 34,
    height: getFontScale() > 1 ? 79 : 46,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    maxWidth: 317,
    width: dimensions.width < 500 ? 293 : 317
  },
  whiteContainer: {
    backgroundColor: colors.white
  },
  headerText: {
    alignSelf: "center",
    paddingTop: 18,
    position: "absolute"
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  photoSizeText: {
    color: colors.seekForestGreen,
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.78
  },
  selectedPhotoSizeText: {
    fontFamily: fonts.semibold
  },
  linkText: {
    alignSelf: "center",
    color: colors.linkText,
    fontFamily: fonts.book,
    fontSize: 18,
    textDecorationLine: "underline",
    paddingVertical: 27
  },
  optionsText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 19,
    letterSpacing: 1.12,
    marginTop: 18,
    marginLeft: 24
  },
  speciesIdText: {
    fontFamily: fonts.book,
    fontSize: 16
  },
  buttonText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: padding.iOSButtonPadding,
    textAlign: "center",
    marginLeft: 10
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  image: {
    backgroundColor: colors.black,
    width: dimensions.width,
    // containing the image shows an accurate watermark on the social screen
    resizeMode: "contain",
    height: dimensions.height
  },
  squareImage: {
    width: dimensions.width,
    // containing the image shows an accurate watermark on the social screen
    resizeMode: "contain",
    height: dimensions.width,
    backgroundColor: colors.black
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
