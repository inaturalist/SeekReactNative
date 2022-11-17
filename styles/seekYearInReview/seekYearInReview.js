// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, row, center, dimensions } from "../global";

import type {
  ViewStyleProp,
  TextStyleProp,
  ImageStyleProp
} from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center,
  row,
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
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center"
  },
  headerText: {
    // TODO: changed from acchievements to year in review
    // color: colors.white,
    color: colors.black,
    fontFamily: fonts.semibold,
    fontSize: 23,
    letterSpacing: 1.0
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
