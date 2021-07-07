// @flow

import { StyleSheet } from "react-native";
import { colors, fonts, dimensions } from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  header: {
    alignItems: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: "100%"
  },
  marginBottom: {
    marginBottom: dimensions.width < 350 ? 15 : 39
  },
  marginTop: {
    marginTop: dimensions.width < 350 ? 10 : 24
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    marginHorizontal: 24,
    marginTop: dimensions.width < 350 ? 12 : 18,
    textAlign: "center"
  },
  headerText: {
    color: colors.seekForestGreen,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    lineHeight: 24,
    marginHorizontal: 24,
    textAlign: "center"
  },
  seekBannerText: {
    fontSize: 19,
    letterSpacing: 1.12
  },
  bannerText: {
    paddingTop: 10,
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 15,
    letterSpacing: 0.42,
    lineHeight: 34,
    textAlign: "center"
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  logo: {
    height: 70,
    resizeMode: "contain",
    width: 209
  },
  headerImage: {
    alignItems: "center",
    height: dimensions.width < 350 ? 200 : 232,
    width: "100%"
  },
  badge: {
    height: dimensions.width < 350 ? 140 : 158,
    marginTop: 25,
    width: dimensions.width < 350 ? 140 : 158
  },
  seekBanner: {
    bottom: dimensions.width < 350 ? 12 : 29,
    height: 48,
    position: "absolute",
    width: 300
  },
  iNatLogo: {
    height: 45,
    width: 246
  },
  natGeoLogo: {
    height: 45,
    width: 153
  }
} );

  export {
    viewStyles,
    textStyles,
    imageStyles
  };

