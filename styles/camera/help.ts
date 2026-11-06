import { Dimensions, StyleSheet } from "react-native";

import { colors, fonts, row } from "../global";

const { width, height } = Dimensions.get( "window" );
const bannerHeight = width / 2.5;
// The word is rotated, so its layout width is the vertical space under the dots.
const labelLength = Math.round( bannerHeight * 0.62 );

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
  // Dots are painted left-to-right in the photo, so the names must not flip in RTL.
  rankRow: {
    bottom: 6,
    direction: "ltr",
    flexDirection: "row",
    left: 8,
    position: "absolute",
    right: 8,
    top: "28%",
  },
  rankColumn: {
    flex: 1,
    position: "relative",
  },
  rankLabel: {
    color: colors.white,
    fontFamily: fonts.bold,
    fontSize: 13,
    left: "50%",
    letterSpacing: 1,
    lineHeight: 16,
    marginLeft: -( labelLength / 2 ),
    marginTop: -8,
    position: "absolute",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.65)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
    top: "50%",
    transform: [{ rotate: "-90deg" }],
    width: labelLength,
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
