import { StyleSheet } from "react-native";

import { colors, fonts, row } from "../global";

const DESIGN_WIDTH = 375;

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

// Width and height come from useWindowDimensions so a rotation or split view rescales the banner.
const createHelpStyles = ( width: number, height: number ) => {
  const bannerHeight = width / 2.5;
  const scale = width / DESIGN_WIDTH;
  const fontSize = 18 * scale;
  const lineHeight = fontSize;
  const columnWidth = 40 * scale;
  const dotSize = 10 * scale;
  const dotFill = 8 * scale;
  // Dot centers on the 375×180 art: x starts at 67.5, y is 35.5. Cover crops 15px off the top.
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

  const imageStyles = StyleSheet.create( {
    banner: {
      height: bannerHeight,
      width,
    },
    dot: {
      backgroundColor: colors.white,
      borderRadius: dotSize / 2,
      height: dotSize,
      padding: scale,
      width: dotSize,
    },
    dotFill: {
      backgroundColor: "#47a364",
      borderRadius: dotFill / 2,
      flex: 1,
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

  return { imageStyles, viewStyles };
};

export {
  createHelpStyles,
  textStyles,
};
