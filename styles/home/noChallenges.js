// @flow

import { StyleSheet } from "react-native";
import {
  center,
  row
} from "../global";

import type { ViewStyleProp, TextStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  center,
  noChallengeTextContainer: {
    marginLeft: 28
  },
  row
} );

const textStyles: { [string]: TextStyleProp } = StyleSheet.create( {
  text: {
    marginTop: 11
  },
  textWidth: {
    width: 195
  }
} );

export {
  viewStyles,
  textStyles
};

