// @flow

import { StyleSheet, I18nManager } from "react-native";
import {
  colors,
  fonts,
  dimensions,
  row
} from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1
  },
  footer: {
    backgroundColor: colors.white,
    paddingBottom: dimensions.height > 670 ? 35 : 15,
    paddingTop: 15
  },
  greenCircle: {
    backgroundColor: colors.seekGreen,
    borderRadius: 281 / 2,
    height: 281,
    opacity: 0.33,
    width: 281
  },
  header: {
    backgroundColor: colors.seekForestGreen
  },
  image: {
    padding: 5
  },
  inputRow: {
    justifyContent: "space-between",
    marginBottom: 15,
    marginHorizontal: 23,
    marginTop: 20
  },
  locationIcon: {
    bottom: 19,
    position: "absolute",
    right: 19
  },
  map: {
    backgroundColor: colors.white,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  margin: {
    marginTop: 15
  },
  marginLarge: {
    marginTop: 20
  },
  pinFixed: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  row,
  textContainer: {
    backgroundColor: colors.white,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    justifyContent: "center",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  backButton: {
    left: 0,
    paddingVertical: 18,
    paddingHorizontal: 23,
    position: "absolute",
    transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  headerText: {
    alignSelf: "center",
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    maxWidth: dimensions.width - 100
  },
  text: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginHorizontal: 20
  },
  inputField: {
    backgroundColor: colors.white,
    borderRadius: 40,
    color: colors.black,
    fontFamily: fonts.medium,
    fontSize: 15,
    height: 37,
    paddingBottom: 0,
    paddingLeft: 20,
    paddingTop: 0,
    width: "91%"
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  white: {
    height: 19,
    resizeMode: "contain",
    tintColor: colors.white,
    width: 14
  },
  markerPin: {
    height: 33,
    width: 23,
    marginLeft: 14
  }
} );

export {
  viewStyles,
  textStyles,
  imageStyles
};
