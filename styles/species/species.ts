// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, row, dimensions } from "../global";

const backgroundHeight = dimensions.height;
const bottomPadding = 100;

const viewStyles = StyleSheet.create( {
  backButton: {
    left: 0,
    paddingBottom: 18,
    paddingHorizontal: 23,
    paddingTop: 23,
    position: "absolute",
    zIndex: 1
  },
  background: {
    backgroundColor: colors.white,
    minHeight: backgroundHeight
  },
  landscapeBackground: {
    backgroundColor: colors.white,
    paddingBottom: bottomPadding
  },
  bottomPadding: {
    paddingBottom: bottomPadding
  },
  twoColumnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.white
  },
  checkmark: {
    marginRight: 10
  },
  greenBanner: {
    backgroundColor: colors.seekForestGreen
  },
  headerMargins: {
    marginBottom: 11,
    marginTop: 45
  },
  marginSmall: {
    marginTop: 21
  },
  row,
  rowMargin: {
    marginTop: 28
  },
  textContainer: {
    marginHorizontal: 28
  },
  largerTextContainer: {
    marginHorizontal: 32
  },
  selectedPressableArea: {
    backgroundColor: "rgb(176, 196, 222)",
    alignSelf: "flex-start"
  },
  topRibbon: {
    paddingTop: 2,
    backgroundColor: colors.speciesNearbyGreen
  }
} );

const textStyles = StyleSheet.create( {
  commonNameText: {
    marginTop: 23,
    marginHorizontal: 28
  },
  humanText: {
    marginTop: 45,
    textAlign: "center"
  },
  italicText: {
    color: colors.black,
    fontFamily: fonts.bookItalic,
    fontSize: 16,
    lineHeight: 21
  },
  iconicTaxaText: {
    paddingLeft: 28,
    paddingVertical: 12,
    backgroundColor: colors.seekForestGreen
  },
  largerPadding: {
    paddingLeft: 32
  },
  linkText: {
    paddingTop: 10,
    textDecorationLine: "underline"
  }
} );

export {
  viewStyles,
  textStyles
};
