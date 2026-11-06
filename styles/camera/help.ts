import { Dimensions, StyleSheet } from "react-native";

import { colors, fonts, row } from "../global";

const { width, height } = Dimensions.get( "window" );
const bannerHeight = width / 2.5;
// Measured from img-camerahelp-taxonomy (375×180). Cover crops 15px off the top.
const DESIGN_WIDTH = 375;
const scale = width / DESIGN_WIDTH;
const fontSize = 18 * scale;
const lineHeight = fontSize;
const columnWidth = 40 * scale;
const dotSize = 9 * scale;
// Cover crops 15px off the 180px-tall art. Dot centers were at y=35.5, x starting at 67.5.
const labelLength = 90 * scale;

const viewStyles = StyleSheet.create( {
  howText: {
    marginRight: 36,
    width: height > 570 ? 192 : 140,
  },
  row,
  textContainer: {
    backgroundColor: colors.white,
    marginHorizontal: 30,
    marginTop: 20,
  },
  tipContainer: {
    width: height > 570 ? 260 : 230,
  },
  tips: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginBottom: 11,
  },
} );

const textStyles = StyleSheet.create( {
  bullets: {
    fontSize: 26,
    lineHeight: 21,
    marginLeft: 13,
    marginRight: 20,
    marginTop: 3,
  },
  headerText: {
    marginBottom: 11,
    marginTop: 35,
  },
} );

const imageStyles = StyleSheet.create( {
  banner: {
    height: bannerHeight,
    width,
  },
  dot: {
    backgroundColor: "#47a364",
    borderRadius: dotSize / 2,
    height: dotSize,
    width: dotSize,
  },
  labelRotate: {
    flexDirection: "row",
    height: lineHeight,
    justifyContent: "flex-end",
    left: ( lineHeight - labelLength ) / 2,
    position: "absolute",
    top: ( labelLength - lineHeight ) / 2,
    transform: [{ rotate: "-90deg" }],
    width: labelLength,
  },
  labelSlot: {
    height: labelLength,
    marginTop: 25 * scale,
    width: lineHeight,
  },
  rankColumn: {
    alignItems: "center",
    width: columnWidth,
  },
  rankLabel: {
    color: colors.white,
    flexShrink: 0,
    fontFamily: fonts.bold,
    fontSize,
    lineHeight,
    maxWidth: labelLength,
  },
  rankRow: {
    direction: "ltr",
    flexDirection: "row",
    left: ( 67.5 - 20 ) * scale,
    position: "absolute",
    top: ( 35.5 - 15 ) * scale - dotSize / 2,
  },
  topImage: {
    height: bannerHeight,
    resizeMode: "cover",
    width,
  },
} );

export {
  imageStyles,
  textStyles,
  viewStyles,
};
