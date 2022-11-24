// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, row, center, dimensions } from "../global";

import type {
  ViewStyleProp,
  TextStyleProp,
  ImageStyleProp
} from "react-native/Libraries/StyleSheet/StyleSheet";

// added decimal because this was going off the screen on Android Pixel 4
const badgeIconWidth = Math.min( 455, dimensions.width ) / 4.0005;

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  header: {
    minHeight: 136 + 25 + 26
  },
  center,
  row,
  levelTextContainer: {
    marginLeft: 22,
    paddingBottom: 26,
    paddingTop: 25,
    width: 170
  },
  badgesTextContainer: {
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: badgeIconWidth * 3 + 12 * 3
  },
  badgeTextContainer: {
    resizeMode: "contain",
    width: badgeIconWidth,
    marginHorizontal: 6
  },
  textContainer: {
    marginHorizontal: 26
  },
  tabletContainer: {
    maxWidth: 455,
    alignSelf: "center"
  },
  photoMargins: {
    marginVertical: 33,
    height: 300
  },
  map: {
    height: 189,
    marginBottom: 20
  },
  divider: {
    height: 45
  },
  smallDivider: {
    height: 18
  },
  sliderItem: {
    height: 300,
    backgroundColor: colors.white
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  lightText: {
    color: colors.white,
    fontFamily: fonts.light,
    fontSize: 18,
    letterSpacing: 0.78,
    marginBottom: 10
  },
  headerText: {
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0
  },
  bigText: {
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 19,
    lineHeight: 24,
    textAlign: "center"
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  },
  caption: {
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
    maxWidth: 245
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  levelImage: {
    resizeMode: "contain",
    height: 136,
    width: 136
  },
  image: {
    height: 286,
    resizeMode: "cover",
    width: dimensions.width
  }
} );


export { viewStyles, textStyles, imageStyles };
