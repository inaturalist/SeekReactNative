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
    minHeight: 117 + 25 + 26
  },
  center,
  row,
  levelTextContainer: {
    marginLeft: 22,
    paddingBottom: 26,
    paddingTop: 25,
    width: 167
  },
  textContainer: {
    alignItems: "center",
    marginHorizontal: 26,
    marginTop: 31
  },
  tabletContainer: {
    maxWidth: 455,
    alignSelf: "center"
  },
  photoMargins: {
    marginVertical: 33
  },
  map: {
    height: 189,
    marginBottom: 20
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
  iconicTaxaNameText: {
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
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  levelImage: {
    height: 117,
    resizeMode: "contain",
    width: 117
  },
  image: {
    height: 286,
    resizeMode: "cover",
    width: dimensions.width
  }
} );


export { viewStyles, textStyles, imageStyles };
