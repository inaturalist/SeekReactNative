// @flow

import { StyleSheet } from "react-native";
import { colors } from "../global";

import type { ViewStyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";

const viewStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  whiteContainer: {
    paddingTop: 35,
    backgroundColor: colors.white
  },
  marginGreenButtonLarge: {
    marginTop: 33
  },
  marginBottom: {
    marginTop: 48
  }
} );

const textStyles: { [string]: ViewStyleProp } = StyleSheet.create( {
  header: {
    paddingLeft: 22,
    paddingBottom: 21
  }
} );

export { viewStyles, textStyles };
