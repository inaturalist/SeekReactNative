// @flow

import { StyleSheet } from "react-native";
import {
  colors,
  fonts
} from "../../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const maxColumnWidth = 455;

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  whiteContainer: {
    paddingTop: 35,
    backgroundColor: colors.white
  },
  marginGreenButton: {
    marginTop: 22
  },
  marginGreenButtonLarge: {
    marginTop: 33
  },
  marginBottom: {
    marginTop: 48
  },
  textContainer: {
    paddingHorizontal: 33,
    paddingTop: 21
  },
  paddingAboveText: {
    paddingTop: 15
  },
  landscapeContainerRestrictedWidth: {
    width: maxColumnWidth,
    alignSelf: "center"
  }
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  header: {
    paddingLeft: 22
  }
} );

export {
  textStyles,
  viewStyles
};
