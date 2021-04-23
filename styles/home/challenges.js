// @flow

import { StyleSheet } from "react-native";
import { colors, fonts } from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  challengeContainer: {
    backgroundColor: colors.darkGray,
    flex: 1
  },
  container: {
    backgroundColor: colors.white
  },
  header: {
    paddingBottom: 21,
    paddingHorizontal: 22,
    paddingTop: 25
  },
  marginMedium: {
    marginTop: 28
  },
  marginSmall: {
    marginTop: 22
  },
  marginTop: {
    marginTop: 31
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  viewText: {
    alignSelf: "center",
    color: colors.white,
    fontFamily: fonts.book,
    fontSize: 16,
    paddingBottom: 31,
    paddingTop: 15,
    textDecorationLine: "underline"
  },
  adminText: {
    color: colors.black,
    fontFamily: fonts.book,
    fontSize: 16,
    paddingHorizontal: 22,
    paddingBottom: 10
  }
} );

export {
  viewStyles,
  textStyles
};
