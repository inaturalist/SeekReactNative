// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  background: {
    backgroundColor: colors.white
  },
  challengeBackground: {
    flex: 1,
    paddingTop: 99
  },
  marginLarge: {
    marginTop: 37
  },
  marginMedium: {
    marginTop: 28
  },
  marginSmall: {
    marginTop: 21
  },
  opContainer: {
    alignSelf: "center",
    marginTop: 23
  },
  textContainer: {
    paddingHorizontal: 35
  },
  whiteContainer: {
    backgroundColor: colors.white
  },
  loadingWheelContainer: {
    height: 223,
    justifyContent: "center"
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  descriptionText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21
  },
  photographerText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 29
  },
  viewText: {
    color: colors.seekTeal,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    textDecorationLine: "underline"
  },
  speciesNearbyErrorText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 21,
    textAlign: "center",
    marginHorizontal: 28
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  iNatLogo: {
    height: 35,
    top: 32,
    width: 191
  },
  logo: {
    alignSelf: "center",
    height: 58,
    position: "absolute",
    resizeMode: "contain",
    top: 20,
    width: 116
  },
  natGeoLogo: {
    width: 142,
    height: 41
  },
  myGardenLogo: {
    width: 145,
    height: 48
  },
  myGardenContainer: {
    alignSelf: "center",
    width: "100%",
    height: 85,
    marginTop: 23,
    resizeMode: "contain"
  }
} );

  export {
    viewStyles,
    textStyles,
    imageStyles
  };

