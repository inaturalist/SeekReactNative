// @flow

import { StyleSheet, I18nManager } from "react-native";
import {
  colors,
  fonts,
  dimensions
} from "../global";

const { width } = dimensions;

// from whiteModal.js styling
const modalWidth = Math.min(
  width > 350 ? width - width * 0.1 : width,
  366 );

const setImageWidth = ( ) => {
  if ( width < 366 ) {
    return width / 2;
  }
  return 366 / 2;
};

const setCarouselHorizontalMargins = ( ) => {
  return ( modalWidth - setImageWidth( ) ) / 2;
};

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  arrow: {
    padding: 27,
    position: "absolute",
    right: 0,
    top: 190 - 27,
    transform: [{ rotate: I18nManager.isRTL ? "180deg" : "0deg" }],
    zIndex: 1
  },
  carousel: {
    alignItems: "center"
  },
  leftArrow: {
    left: 0,
    padding: 27,
    position: "absolute",
    top: 190 - 27,
    transform: [{ rotate: I18nManager.isRTL ? "0deg" : "180deg" }],
    zIndex: 1
  },
  margin: {
    marginBottom: 9
  },
  marginBottom: {
    marginBottom: 27
  },
  marginLarge: {
    marginTop: 39
  },
  marginMedium: {
    marginBottom: 11
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap"
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  bullets: {
    color: colors.seekForestGreen,
    fontSize: 37,
    marginHorizontal: 41
  },
  nameText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    marginHorizontal: 27,
    textAlign: "center"
  },
  transparent: {
    color: colors.white
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  imageStyle: {
    resizeMode: "contain"
  },
  smallImage: {
    height: 57,
    marginHorizontal: 20,
    resizeMode: "contain",
    width: 57
  },
  badgeIcon: {
    height: setImageWidth( ),
    justifyContent: "center",
    marginBottom: 25,
    width: setImageWidth( ),
    marginHorizontal: setCarouselHorizontalMargins( )
  }
} );

export {
  textStyles,
  viewStyles,
  imageStyles
};
