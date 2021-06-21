// @flow

import { StyleSheet, Platform } from "react-native";
import {
  colors,
  dimensions,
  fonts
} from "../global";

import type { ViewStyleProp, TextStyleProp, ImageStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  backButton: {
    left: 23,
    paddingBottom: 18,
    paddingTop: 18
  },
  card: {
    marginBottom: 18,
    marginLeft: 24
  },
  container: {
    backgroundColor: colors.seekForestGreen,
    flex: 1
  },
  whiteContainer: {
    backgroundColor: colors.white,
    flexGrow: 1
  },
  header: {
    backgroundColor: colors.seekForestGreen,
    height: 55
  },
  headerMargins: {
    marginTop: 27,
    marginLeft: 24,
    marginBottom: 18
  },
  photoContainer: {
    alignItems: "center",
    backgroundColor: colors.black,
    height: 155
  },
  row: {
    alignItems: "center",
    backgroundColor: colors.seekForestGreen,
    flexDirection: "row",
    flexWrap: "nowrap",
    height: 63,
    justifyContent: "center"
  },
  suggestionsTopMargin: {
    marginTop: 23
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  topHeader: {
    alignSelf: "center",
    color: colors.white,
    fontFamily: fonts.semibold,
    fontSize: 18,
    letterSpacing: 1.0,
    paddingTop: Platform.OS === "android" ? 18 : 20,
    position: "absolute"
  },
  inputField: {
    backgroundColor: colors.white,
    borderRadius: 40,
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 15,
    height: 37,
    marginLeft: 11,
    paddingBottom: 0,
    paddingLeft: 16,
    paddingTop: 0,
    width: dimensions.width - 19 - 52
  }
} );

const imageStyles: { [string]: ImageStyleProp } = StyleSheet.create( {
  image: {
    height: 155,
    resizeMode: "contain",
    width: dimensions.width
  },
  search: {
    height: 20,
    resizeMode: "contain",
    tintColor: colors.white,
    width: 20
  }
} );

export {
  viewStyles,
  textStyles,
  imageStyles
};
