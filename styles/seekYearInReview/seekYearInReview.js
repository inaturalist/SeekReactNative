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
const landscapeMaxWidth = 455;

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
    width: landscapeMaxWidth,
    alignSelf: "center"
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
    marginTop: 16,
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
    height: 186,
    width: dimensions.width,
    resizeMode: "cover"
  }
} );


export { viewStyles, textStyles, imageStyles };
