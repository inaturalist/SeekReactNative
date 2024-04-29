// @flow

import { StyleSheet } from "react-native";
import { colors } from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  challengeContainer: {
    backgroundColor: colors.darkGray
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
    paddingBottom: 31,
    paddingTop: 15,
    textDecorationLine: "underline"
  }
} );

export {
  viewStyles,
  textStyles
};
